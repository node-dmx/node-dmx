import {EventEmitter} from 'events';
import SerialPort from 'serialport';
import {IUniverseDriver, UniverseData} from '../models/IUniverseDriver';

export interface AbstractSerialDriverArgs {
  serialPortOptions: SerialPort.OpenOptions;
  sendInterval: number;
}

export abstract class AbstractSerialDriver extends EventEmitter implements IUniverseDriver {
  private _serialPort!: SerialPort;

  private readonly _universe: Buffer;
  private readonly _sendInterval: number;
  private readonly _serialPortName: string;
  private readonly _serialPortOptions: SerialPort.OpenOptions;
  private _intervalHandle: any | undefined = undefined;

  protected constructor(serialPort: string, args: AbstractSerialDriverArgs) {
    super();
    this._sendInterval = args.sendInterval;
    this._serialPortName = serialPort;
    this._serialPortOptions = args.serialPortOptions;

    this._universe = Buffer.alloc(513);
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._serialPort = new SerialPort(this._serialPortName, this._serialPortOptions, (err) => {
        if (!err) {
          this.start();
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  close(): Promise<void> {
    this.stop();
    return new Promise((resolve, reject) => this._serialPort.close((err: any) => err ? reject(err) : resolve()));
  }

  protected get serialPort(): SerialPort {
    return this._serialPort;
  }

  protected get universeBuffer(): Buffer {
    return this._universe;
  }

  protected start(): void {
    if (this._intervalHandle !== undefined) {
      throw new Error('Driver is already running.');
    }
    this._intervalHandle = setInterval(this.sendUniverse.bind(this), this._sendInterval);
  }

  protected stop(): void {
    if (this._intervalHandle !== undefined) {
      clearInterval(this._intervalHandle);
      this._intervalHandle = undefined;
    }
  }

  protected abstract sendUniverse(): Promise<void>;

  get(channel: number): number {
    return this._universe[channel];
  }

  update(channels: UniverseData, extraData?: any): void {

    for (const c in channels) {
      this._universe[c] = channels[c];
    }

    this.emit('update', channels, extraData);
  }

  updateAll(value: number): void {
    for (let i = 1; i <= 512; i++) {
      this._universe[i] = value;
    }
  }

}

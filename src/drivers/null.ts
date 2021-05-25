import {EventEmitter} from 'events';
import {IUniverseDriver} from '../models/IUniverseDriver';

export interface NullDriverArgs {
  dmxSpeed?: number;
}

export class NullDriver extends EventEmitter implements IUniverseDriver {
  constructor(options: NullDriverArgs = {}) {
    super();

    this._universe = Buffer.alloc(513, 0);
    this._interval = 1000 / (options?.dmxSpeed ?? 1);
  }

  async init(): Promise<void> {
    this.start();
  }

  close(): void {
    this.stop();
  }

  update(u: {[key: number]: number}, extraData: any): void {
    for (const c in u) {
      this._universe[c] = u[c];
    }
    this.logUniverse();

    this.emit('update', u, extraData);
  }

  updateAll(v: number): void {
    for (let i = 1; i <= 512; i++) {
      this._universe[i] = v;
    }
  }

  get(c: number): number {
    return this._universe[c];
  }

  logUniverse(): void {
    console.log(this._universe.slice(1));
  }

  private start(): void {
    this._timeout = setInterval(() => {
      this.logUniverse();
    }, this._interval);
  }

  private stop(): void {
    clearInterval(this._timeout);
  }

  private readonly _universe: Buffer;
  private readonly _interval: number;
  private _timeout: any;
}

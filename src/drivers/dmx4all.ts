import {AbstractSerialDriver} from './abstract-serial-driver';

const UNIVERSE_LEN = 512;

export interface DMX4AllArgs {
  dmxSpeed?: number;
}

export class DMX4AllDriver extends AbstractSerialDriver {
  private readyToWrite: boolean;

  constructor(serialPort: string, options: DMX4AllArgs = {}) {
    super(serialPort, {
      serialPortOptions: {
        'baudRate': 38400,
        'dataBits': 8,
        'stopBits': 1,
        'parity': 'none',
      },
      sendInterval: 1000 / (options.dmxSpeed || 33),
    });
    this.readyToWrite = true;
  }

  async sendUniverse(): Promise<void> {
    if (!this.serialPort.writable) {
      return;
    }

    if (this.readyToWrite) {
      this.readyToWrite = false;

      const msg = Buffer.alloc(UNIVERSE_LEN * 3);

      for (let i = 0; i < UNIVERSE_LEN; i++) {
        msg[i * 3 + 0] = (i < 256) ? 0xE2 : 0xE3;
        msg[i * 3 + 1] = i;
        msg[i * 3 + 2] = this.universeBuffer[i + 1];
      }

      this.serialPort.write(msg);
      this.serialPort.drain(() => {
        this.readyToWrite = true;
      });
    }
  }
}

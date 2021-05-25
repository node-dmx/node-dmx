import {AbstractSerialDriver} from './abstract-serial-driver';

const ENTTEC_PRO_DMX_STARTCODE = 0x00;
const ENTTEC_PRO_START_OF_MSG = 0x7e;
const ENTTEC_PRO_END_OF_MSG = 0xe7;
const ENTTEC_PRO_SEND_DMX_RQ = 0x06;

// var ENTTEC_PRO_RECV_DMX_PKT = 0x05;

export interface EnttecUSBDMXProArgs {
  dmxSpeed?: number;
}

export class EnttecUSBDMXProDriver extends AbstractSerialDriver {
  private _readyToWrite: boolean;

  constructor(serialPort: string, options: EnttecUSBDMXProArgs = {}) {
    super(serialPort, {
      serialPortOptions: {
        'baudRate': 250000,
        'dataBits': 8,
        'stopBits': 2,
        'parity': 'none',
      },
      sendInterval: 1000 / (options.dmxSpeed || 40),
    });

    this._readyToWrite = true;
  }

  async sendUniverse(): Promise<void> {
    if (!this.serialPort.writable) {
      return;
    }

    if (this._readyToWrite) {
      const hdr = Buffer.from([
        ENTTEC_PRO_START_OF_MSG,
        ENTTEC_PRO_SEND_DMX_RQ,
        (this.universeBuffer.length) & 0xff,
        ((this.universeBuffer.length) >> 8) & 0xff,
        ENTTEC_PRO_DMX_STARTCODE,
      ]);

      const msg = Buffer.concat([
        hdr,
        this.universeBuffer.slice(1),
        Buffer.from([ENTTEC_PRO_END_OF_MSG]),
      ]);

      this._readyToWrite = false;
      this.serialPort.write(msg);
      this.serialPort.drain(() => {
        this._readyToWrite = true;
      });
    }
  }
}

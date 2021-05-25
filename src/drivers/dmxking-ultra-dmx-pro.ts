import {AbstractSerialDriver} from './abstract-serial-driver';

const DMXKING_ULTRA_DMX_PRO_DMX_STARTCODE = 0x00;
const DMXKING_ULTRA_DMX_PRO_START_OF_MSG = 0x7e;
const DMXKING_ULTRA_DMX_PRO_END_OF_MSG = 0xe7;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_RQ = 0x06;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_A_RQ = 0x64;
const DMXKING_ULTRA_DMX_PRO_SEND_DMX_B_RQ = 0x65;

// var DMXKING_ULTRA_DMX_PRO_RECV_DMX_PKT = 0x05;

export interface DMXKingUltraDMXProDriverArgs {
  dmxSpeed?: number;
  port?: 'A' | 'B';
}

export class DMXKingUltraDMXProDriver extends AbstractSerialDriver {
  private readonly _options: DMXKingUltraDMXProDriverArgs;
  private readonly _sendDMXReq: number;
  private _readyToWrite: boolean;

  constructor(serialPort: string, options: DMXKingUltraDMXProDriverArgs = {}) {
    super(serialPort, {
      serialPortOptions: {
        'baudRate': 250000,
        'dataBits': 8,
        'stopBits': 2,
        'parity': 'none',
      },
      sendInterval: 1000 / (options.dmxSpeed || 40),
    });
    this._options = options;
    this._readyToWrite = true;

    this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_RQ;
    if (this._options.port === 'A') {
      this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_A_RQ;
    } else if (this._options.port === 'B') {
      this._sendDMXReq = DMXKING_ULTRA_DMX_PRO_SEND_DMX_B_RQ;
    }

  }

  async sendUniverse(): Promise<void> {
    if (!this.serialPort.writable) {
      return;
    }

    if (this._readyToWrite) {
      this._readyToWrite = false;

      const hdr = Buffer.from([
        DMXKING_ULTRA_DMX_PRO_START_OF_MSG,
        this._sendDMXReq,
        (this.universeBuffer.length) & 0xff,
        ((this.universeBuffer.length) >> 8) & 0xff,
        DMXKING_ULTRA_DMX_PRO_DMX_STARTCODE,
      ]);

      const msg = Buffer.concat([
        hdr,
        this.universeBuffer.slice(1),
        Buffer.from([DMXKING_ULTRA_DMX_PRO_END_OF_MSG]),
      ]);

      this.serialPort.write(msg);
      this.serialPort.drain(() => {
        this._readyToWrite = true;
      });
    }
  }
}

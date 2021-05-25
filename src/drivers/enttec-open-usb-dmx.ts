import {wait} from '../util/time';
import {AbstractSerialDriver} from './abstract-serial-driver';

export interface EnttecOpenUsbDmxArgs {
  dmxSpeed?: number;
}

/**
 * Controls the Enttec Open DMX device:
 * https://www.enttec.com.au/product/lighting-communication-protocols/usb-lighting-interface/open-dmx-usb/
 *
 * The controller uses a FTDI FT232RL chip for serial communication. See
 * [here](http://www.ftdichip.com/Support/Documents/ProgramGuides/D2XX_Programmer's_Guide(FT_000071).pdf)
 * for an API reference and to translate the Enttec code examples to Node.js/Serialport.
 */
export class EnttecOpenUSBDMXDriver extends AbstractSerialDriver {
  private _readyToWrite: boolean;

  constructor(serialPort: string, args?: EnttecOpenUsbDmxArgs) {
    super(serialPort, {
      serialPortOptions: {
        'baudRate': 250000,
        'dataBits': 8,
        'stopBits': 2,
        'parity': 'none',
      },
      sendInterval: args?.dmxSpeed ? (1000 / args.dmxSpeed) : 46,
    });

    this._readyToWrite = true;
  }

  async sendUniverse(): Promise<void> {
    if (!this.serialPort.writable) {
      return;
    }

    // toggle break
    await this.serialPort.set({brk: true, rts: false});
    await wait(1);
    await this.serialPort.set({brk: false, rts: false});
    await wait(1);
    if (this._readyToWrite) {
      const dataToWrite = Buffer.concat([Buffer.from([0]), this.universeBuffer.slice(1)]);

      this._readyToWrite = false;
      this.serialPort.write(dataToWrite);
      this.serialPort.drain(() => {
        this._readyToWrite = true;
      });
    }
  }
}

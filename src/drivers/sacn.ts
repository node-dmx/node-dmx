import {EventEmitter} from 'events';
import {IUniverseDriver, UniverseData} from '../models/IUniverseDriver';
import * as sacn from 'sacn';

export class SACNDriver extends EventEmitter implements IUniverseDriver {
  sACNServer: any;
  universe: any = {};

  constructor(universe = 1) {
    super();
    this.sACNServer = new sacn.Sender({
      universe: universe || 1,
      reuseAddr: true,
    });
  }

  async init(): Promise<void> {
  }

  close(): void {
    this.sACNServer.close();
  }

  update(u: UniverseData, extraData: any): void {
    for (const c in u) {
      this.universe[c] = SACNDriver.dmxToPercent(u[c]);
    }
    this.sendUniverse();
  }

  sendUniverse(): void {
    this.sACNServer.send({
      payload: this.universe,
    });
  }

  updateAll(v: number): void {
    for (let i = 1; i <= 512; i++) {
      this.universe[i] = SACNDriver.dmxToPercent(v);
    }
    this.sendUniverse();
  }

  get(c: number): number {
    return SACNDriver.percentToDmx(this.universe[c]);
  }

  static dmxToPercent(v: number): number {
    return v / 255 * 100;
  }

  static percentToDmx(v: number): number {
    return v / 100 * 255;
  }
}

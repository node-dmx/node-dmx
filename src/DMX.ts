import { EventEmitter } from 'events';
import { Devices, PredefinedDevices } from './devices';
import { Events } from './models/Events';
import { IUniverseDriver } from './models/IUniverseDriver';

export interface DmxArgs {
    devices?: any;
}

export class DMX extends EventEmitter {
    private readonly _devices: Devices;
    private readonly _universesByName: Map<string, IUniverseDriver> = new Map();
    constructor(options?: DmxArgs) {
      super();
      const devices = options?.devices ?? {};

      this._devices = Object.assign({}, PredefinedDevices, devices);
    }

    async addUniverse(name: string, universe: IUniverseDriver): Promise<IUniverseDriver> {
      await universe.init();

      universe.on(Events.update, (channels, extraData) => {
        this.emit(Events.update, name, channels, extraData);
      });

      this._universesByName.set(name, universe);

      return universe;
    }

    update(universeName: string, channels: {[key: number]: number}, extraData?: any): void {
      const universe = this._universesByName.get(universeName);

      if (universe === undefined) {
        throw new Error(`Universe ${universe} does not exist`);
      }
      universe.update(channels, extraData || {});
    }

    updateAll(universe: string, value: number): void {
      this._universesByName.get(universe)?.updateAll(value);
      this.emit(Events.updateAll, universe, value);
    }

    universeToObject(universeKey: string): {[key: number]: number} {
      const universe = this._universesByName.get(universeKey);
      const u: {[key: number]: number} = {};

      for (let i = 0; i < 512; i++) {
        u[i] = universe?.get(i) || 0;
      }

      return u;
    }

    async close(): Promise<void> {
      for (const uni of this._universesByName.values()) {
        await uni.close();
      }
      this.removeAllListeners();
    }
}

import { EventEmitter } from 'events';

export type UniverseData = {
  [key: number]: number;
}

export interface IUniverseDriver extends EventEmitter {
  init(): Promise<void>;
  update(channels: UniverseData, extraData?: any): void;

  get(channel: number): number;

  updateAll(value: number): void;

  close(): Promise<void> | void;
}

import {IUniverseDriver, UniverseData} from '../models/IUniverseDriver';
import * as io from 'socket.io';
import {EventEmitter} from 'events';

export interface SocketIOArgs {
  port?: number;
  debug?: boolean;
}

export class SocketIODriver extends EventEmitter implements IUniverseDriver {
  universe: Buffer;
  server: io.Server;

  constructor(options: SocketIOArgs) {
    super();
    options = options || {};

    const port = options.port || 18909;
    const debug = options.debug || false;

    this.server = io.listen(port);
    this.server.on('connection', (socket) => {
      if (debug) console.info(`Client connected [id=${socket.id}]`);
      socket.on('disconnect', () => {
        if (debug) console.info(`Client gone [id=${socket.id}]`);
      });
    });

    this.universe = Buffer.alloc(513, 0);
  }

  async init(): Promise<void> {
  }

  close(): void {
    this.server.close();
  }

  update(u: UniverseData, extraData: any): void {
    for (const c in u) {
      this.universe[c] = u[c];
    }
    this.server.sockets.emit('update', [...this.universe]);
    this.emit('update', u, extraData);
  }

  updateAll(v: number): void {
    for (let i = 1; i <= 512; i++) {
      this.universe[i] = v;
    }

    this.server.sockets.emit('update', [...this.universe]);
  }

  get(c: number): number {
    return this.universe[c];
  }
}


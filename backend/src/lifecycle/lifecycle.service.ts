import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class LifecycleService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor() {
    console.log('Lifecycle constructor started.');
  }

  async onModuleInit() {
    console.log('Lifecycle async onModuleInit started.');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Lifecycle async onModuleInit ended.');
  }

  onApplicationBootstrap() {
    console.log('Lifecycle onApplicationBootstrap started.');
  }

  async onModuleDestroy() {
    console.log('Lifecycle onModuleDestroy started.');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Lifecycle beforeApplicationShutdown started.', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Lifecycle onApplicationShutdown started.', signal);
  }

  getLifecycleMessage() {
    console.log('LIFECYCLE');
  }
}

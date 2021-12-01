import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { server } from './config';

import { ApplicationModule } from './app/app.module';

export async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    await app.init();

    await app.listen(server.port);
}

bootstrap().then(() => console.log(`Start server on: 0.0.0.0:${ server.port }`));

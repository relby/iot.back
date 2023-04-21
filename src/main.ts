import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://0.0.0.0:1883',
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();

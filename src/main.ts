import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PUBLIC_PATH = './public';

function initializeSwaggerDocumentation(app: INestApplication) {
  const swaggerDocs = new DocumentBuilder()
    .setTitle('iot.back')
    .setDescription('IoT project documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocs);
  SwaggerModule.setup('/docs', app, document);

  if (!fs.existsSync(PUBLIC_PATH)) {
    fs.mkdirSync(PUBLIC_PATH);
  }

  fs.writeFileSync(
    path.join(PUBLIC_PATH, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://0.0.0.0:1883',
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('/api');

  initializeSwaggerDocumentation(app);

  await app.startAllMicroservices();
  await app.listen(3000, '0.0.0.0');

  Logger.log(`${await app.getUrl()}/docs`, 'Documentation');
}

bootstrap();

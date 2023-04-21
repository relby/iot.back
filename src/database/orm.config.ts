import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'node:path';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  logging: false,
  synchronize: false,

  entities: [join(__dirname, '..', 'modules/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],

  namingStrategy: new SnakeNamingStrategy(),
};

export const connectionSource = new DataSource(config);

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...config,
      migrationsRun: true,
      autoLoadEntities: true,
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from './database/orm.config';
import { MetersModule } from './modules/meters/meters.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SseModule } from './modules/sse/sse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),

    MetersModule,
    MetricsModule,
    PaymentsModule,
    SseModule,
  ],
})
export class AppModule {}

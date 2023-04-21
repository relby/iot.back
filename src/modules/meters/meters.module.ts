import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from './entities/meter.entity';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeterEntity])],
  controllers: [MetersController],
  providers: [MetersService],
})
export class MetersModule {}

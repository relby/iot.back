import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { CreateMeterDto } from './dto/create-meter.dto';
import { MetersService } from './meters.service';

@Controller('meters')
export class MetersController {
  public constructor(private readonly metersService: MetersService) {}

  @Get()
  public async getAll() {
    return this.metersService.findAll();
  }

  @Get(':serial')
  public async getBySerial(@Param('serial') serial: string) {
    return this.metersService.findBySerial(serial);
  }

  @Put()
  public async upsert(@Body() dto: CreateMeterDto) {
    return this.metersService.upsert(dto);
  }

  @Patch(':serial')
  public async payBySerial(@Param('serial') serial: string) {
    return this.metersService.payBySerial(serial);
  }
}

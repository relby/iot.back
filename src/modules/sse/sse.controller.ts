import { Controller, Sse } from '@nestjs/common';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  public constructor(private readonly sseService: SseService) {}

  @Sse('meters')
  public async sse() {
    return this.sseService.sendEvents();
  }
}

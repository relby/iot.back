import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { CreateMetricDto } from '../metrics/dto/create-metric.dto';

@Injectable()
export class SseService {
  private readonly events = new Subject<{ data: CreateMetricDto }>();

  public addEvent(data: CreateMetricDto) {
    this.events.next({ data });
  }

  public sendEvents() {
    return this.events.asObservable();
  }
}

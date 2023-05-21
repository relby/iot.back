import { MeterEntity } from '../entities/meter.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  IsNull,
  LoadEvent,
} from 'typeorm';
import { MetricEntity } from 'src/modules/metrics/entities/metric.entity';

@EventSubscriber()
export class MeterSubscriber implements EntitySubscriberInterface<MeterEntity> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return MeterEntity;
  }

  public async afterLoad(meter: MeterEntity, event: LoadEvent<MeterEntity>) {
    const metricsRepository = event.manager.getRepository(MetricEntity);

    const metrics = await metricsRepository.find({
      where: {
        meter: { serial: meter.serial },
        payment: IsNull(),
      },
    });

    ({ cost: meter.cost, consumption: meter.consumption } = metrics.reduce(
      (acc, { cost, watts }) => ({
        cost: acc.cost + cost,
        consumption: acc.consumption + watts,
      }),
      { cost: 0, consumption: 0 },
    ));
  }
}

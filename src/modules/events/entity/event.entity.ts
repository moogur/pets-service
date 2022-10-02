import { BaseEntity } from 'back-shared-utils';
import { Column, Entity } from 'typeorm';

import { EventTypeEnum } from '../type';

@Entity({ name: 'events' })
export class EventEntity extends BaseEntity {
  @Column({ name: 'date', type: 'int4' })
  date: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'fields', type: 'varchar', length: 20_000 })
  fields: string;

  @Column({ name: 'event_type', type: 'enum', enum: EventTypeEnum })
  eventType: EventTypeEnum;
}

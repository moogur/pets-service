import { BaseEntity } from 'back-shared-utils';
import { GenderEnum } from 'back-shared-utils/lib/types';
import { Column, Entity } from 'typeorm';

import { AnimalTypeEnum } from '@shared/types';

@Entity({ name: 'pets' })
export class PetEntity extends BaseEntity {
  @Column({ name: 'user_id_for_create', type: 'uuid' })
  userIdForCreate: string;

  @Column({ name: 'user_ids_for_view', type: 'uuid', array: true, default: {} })
  userIdsForView: string[];

  @Column({ name: 'gender', type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ name: 'birth_date', type: 'int4' })
  birthDate: number;

  @Column({ name: 'animal_type', type: 'enum', enum: AnimalTypeEnum })
  animalType: AnimalTypeEnum;

  @Column({ name: 'breeder', type: 'varchar', length: 30 })
  breeder: string;

  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;

  @Column({ name: 'color', type: 'varchar', length: 30 })
  color: string;

  @Column({ name: 'signs', type: 'varchar', length: 5000, nullable: true })
  signs: string | null;

  @Column({ name: 'description', type: 'varchar', length: 15_000, nullable: true })
  description: string | null;
}

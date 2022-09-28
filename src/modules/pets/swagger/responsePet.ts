import { ApiProperty } from '@nestjs/swagger';
import { values } from 'lodash';

import { AnimalTypeEnum } from '@shared/types';

import { ResponsePetsBirthday } from './responsePetsBirthday';

export class ResponsePet extends ResponsePetsBirthday {
  @ApiProperty({ description: "pet's type", example: AnimalTypeEnum.Cat, enum: values(AnimalTypeEnum) })
  readonly animalType: AnimalTypeEnum;

  @ApiProperty({ description: "pet's breeder", example: 'breeder' })
  readonly breeder: string;

  @ApiProperty({ description: "pet's color", example: 'color' })
  readonly color: string;

  @ApiProperty({ description: "pet's signs", example: 'signs', nullable: true, type: 'string' })
  readonly signs: string | null;

  @ApiProperty({ description: "pet's description", example: 'description', nullable: true, type: 'string' })
  readonly description: string | null;

  @ApiProperty({ description: 'is it possible to edit', example: true })
  readonly readonly: boolean;
}

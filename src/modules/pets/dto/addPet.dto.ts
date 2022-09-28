import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { maxDateTimestamp, minDateTimestamp, customErrorMessages } from 'back-shared-utils/lib/const';
import { GenderEnum } from 'back-shared-utils/lib/types';
import { getTransformToTimestamp } from 'back-shared-utils/lib/validation';
import { Transform } from 'class-transformer';
import { IsOptional, MaxLength, IsInt, Min, Max, IsEnum } from 'class-validator';
import { values } from 'lodash';

import { AnimalTypeEnum } from '@shared/types';

export class AddPetDto {
  @ApiProperty({ description: "pet's] gender", example: GenderEnum.Male, enum: values(GenderEnum) })
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;

  @ApiProperty({
    description: "pet's birthday in iso format",
    example: '2000-12-31T10:00:00.000Z',
    type: 'string',
  })
  @Transform(({ value }) => getTransformToTimestamp(value))
  @IsInt({ message: customErrorMessages.NOT_VALID_ISO_DATE })
  @Min(minDateTimestamp, { message: customErrorMessages.MIN_DATE })
  @Max(maxDateTimestamp, { message: customErrorMessages.MAX_DATE })
  readonly birthDate: number;

  @ApiProperty({ description: "pet's type", example: AnimalTypeEnum.Cat, enum: values(AnimalTypeEnum) })
  @IsEnum(AnimalTypeEnum)
  readonly animalType: AnimalTypeEnum;

  @ApiProperty({ description: "pet's breeder", example: 'breeder' })
  @MaxLength(30)
  readonly breeder: string;

  @ApiProperty({ description: "pet's name", example: 'name' })
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({ description: "pet's color", example: 'color' })
  @MaxLength(30)
  readonly color: string;

  @ApiPropertyOptional({ description: "pet's signs", example: 'signs' })
  @MaxLength(5000)
  @IsOptional()
  readonly signs?: string | null;

  @ApiPropertyOptional({ description: "pet's description", example: 'description' })
  @MaxLength(15_000)
  @IsOptional()
  readonly description?: string | null;
}

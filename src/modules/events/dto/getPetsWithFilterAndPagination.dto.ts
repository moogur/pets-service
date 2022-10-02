import { ApiPropertyOptional } from '@nestjs/swagger';
import { maxDateTimestamp, minDateTimestamp, customErrorMessages } from 'back-shared-utils/lib/const';
import { BaseRequestSortingAndPaginationDto } from 'back-shared-utils/lib/dto';
import { GenderEnum } from 'back-shared-utils/lib/types';
import { getTransformToTimestamp } from 'back-shared-utils/lib/validation';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsInt, MaxLength, Min, ValidateIf, Max } from 'class-validator';
import { isUndefined, values } from 'lodash';

import { AnimalTypeEnum } from '@shared/types';

import { sortingKeys } from '../pets.constants';
import { SortingFieldsKeyType } from '../type';

export class GetPetsWithFilterAndPaginationDto extends BaseRequestSortingAndPaginationDto {
  @ApiPropertyOptional({
    description: 'the field by which the sorting is carried out',
    type: 'string',
    enum: sortingKeys,
  })
  @IsIn(sortingKeys)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly sortField?: SortingFieldsKeyType;

  @ApiPropertyOptional({ description: "pet's name" })
  @MaxLength(30)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly name?: string;

  @ApiPropertyOptional({ description: "pet's breeder" })
  @MaxLength(30)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly breeder?: string;

  @ApiPropertyOptional({ description: "pet's color" })
  @MaxLength(30)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly color?: string;

  @ApiPropertyOptional({ description: "pet's gender", enum: values(GenderEnum) })
  @IsEnum(GenderEnum)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly gender?: GenderEnum;

  @ApiPropertyOptional({ description: "pet's type", enum: values(AnimalTypeEnum) })
  @IsEnum(AnimalTypeEnum)
  @ValidateIf((_, value) => !isUndefined(value))
  readonly animalType?: AnimalTypeEnum;

  @ApiPropertyOptional({
    description: "pet's birthday in iso format (from)",
    example: '2000-12-31T10:00:00.000Z',
    type: 'string',
  })
  @Transform(({ value }) => getTransformToTimestamp(value))
  @IsInt({ message: customErrorMessages.NOT_VALID_ISO_DATE })
  @Min(minDateTimestamp, { message: customErrorMessages.MIN_DATE })
  @Max(maxDateTimestamp, { message: customErrorMessages.MAX_DATE })
  @ValidateIf((_, value) => !isUndefined(value))
  readonly birthDateFrom?: number;

  @ApiPropertyOptional({
    description: "pet's birthday in iso format (to)",
    example: '2000-12-31T10:00:00.000Z',
    type: 'string',
  })
  @Transform(({ value }) => getTransformToTimestamp(value))
  @IsInt({ message: customErrorMessages.NOT_VALID_ISO_DATE })
  @Min(minDateTimestamp, { message: customErrorMessages.MIN_DATE })
  @Max(maxDateTimestamp, { message: customErrorMessages.MAX_DATE })
  @ValidateIf((_, value) => !isUndefined(value))
  readonly birthDateTo?: number;
}

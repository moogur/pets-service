import { ApiProperty } from '@nestjs/swagger';
import { maxDateTimestamp, minDateTimestamp, customErrorMessages } from 'back-shared-utils/lib/const';
import { getTransformToTimestamp } from 'back-shared-utils/lib/validation';
import { Transform } from 'class-transformer';
import { MaxLength, IsInt, Min, Max, IsEnum } from 'class-validator';
import { values } from 'lodash';

import { EventTypeEnum } from '../type';

export class AddEventDto {
  @ApiProperty({ description: "event's type", example: EventTypeEnum.Analyzes, enum: values(EventTypeEnum) })
  @IsEnum(EventTypeEnum)
  readonly eventType: EventTypeEnum;

  @ApiProperty({
    description: "event's date in iso format",
    example: '2000-12-31T10:00:00.000Z',
    type: 'string',
  })
  @Transform(({ value }) => getTransformToTimestamp(value))
  @IsInt({ message: customErrorMessages.NOT_VALID_ISO_DATE })
  @Min(minDateTimestamp, { message: customErrorMessages.MIN_DATE })
  @Max(maxDateTimestamp, { message: customErrorMessages.MAX_DATE })
  readonly date: number;

  @ApiProperty({ description: "event's name", example: 'name' })
  @MaxLength(100)
  readonly name: string;
}

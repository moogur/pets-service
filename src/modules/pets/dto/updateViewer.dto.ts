import { ApiProperty } from '@nestjs/swagger';
import { OnlyIdDto } from 'back-shared-utils';
import { IsEnum } from 'class-validator';
import { values } from 'lodash';

import { ActionTypeEnum } from '../type';

export class UpdateViewerDto extends OnlyIdDto {
  @ApiProperty({ description: 'action type', example: ActionTypeEnum.Add, enum: values(ActionTypeEnum) })
  @IsEnum(ActionTypeEnum)
  readonly action: ActionTypeEnum;
}

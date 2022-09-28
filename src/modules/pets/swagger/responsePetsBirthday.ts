import { ApiProperty } from '@nestjs/swagger';
import { OnlyId } from 'back-shared-utils/lib/swagger';
import { GenderEnum } from 'back-shared-utils/lib/types';
import { values } from 'lodash';

export class ResponsePetsBirthday extends OnlyId {
  @ApiProperty({ description: "pet's gender", example: GenderEnum.Male, enum: values(GenderEnum) })
  readonly gender: GenderEnum;

  @ApiProperty({
    description: "pet's date of birth",
    example: '2000-12-31T10:00:00.000Z',
    type: 'string',
  })
  readonly birthDate: string;

  @ApiProperty({ description: "pet's name", example: 'name' })
  readonly name: string;
}

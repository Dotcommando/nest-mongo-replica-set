import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import ObjectId from 'bson-objectid';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { ROLE } from '../common/constants';
import { GroupDto } from '../common/dto';
import { toObjectId } from '../common/helpers';
import { ICreateGroupReq } from '../types';

export class CreateGroupDto extends PickType(GroupDto, [ 'name', 'roles' ] as const) {}

export class CreateGroupBodyDto implements ICreateGroupReq {
  @ApiProperty({
    description: 'It matches \'_id\' from collection \'users\' from DB. Valid MongoDB compatible ObjectId',
    required: true,
    example: '62a584a2f2fdd2cf95548236',
  })
  @IsDefined()
  @Transform(toObjectId)
  @Type(() => ObjectId)
  _id: ObjectId;

  @ApiProperty({
    description: 'It contains roles and name of the new group',
    required: true,
    example: {
      roles: [ ROLE.USER, ROLE.ADMIN ],
      name: 'My new Group',
    },
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateGroupDto)
  group: CreateGroupDto;
}

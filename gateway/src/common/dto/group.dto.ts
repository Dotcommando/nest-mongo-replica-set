import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import ObjectId from 'bson-objectid';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, NAME_REGEXP, ROLE, ROLE_ARRAY } from '../constants';
import { maxLengthStringMessage, minLengthStringMessage, sanitizeStringIfNotNull, toObjectId } from '../helpers';
import { IGroup } from '../types';

export class GroupDto implements IGroup {
  @ApiProperty({
    description: 'It matches \'_id\' from collection \'groups\' from DB. Valid MongoDB compatible ObjectId',
    required: true,
    example: '62a584a2f2fdd2cf95548236',
  })
  @IsDefined()
  @Transform(toObjectId)
  @Type(() => ObjectId)
  _id: ObjectId;

  @ApiProperty({
    description: `Group name of user. It must have length from ${NAME_MIN_LENGTH} to ${NAME_MAX_LENGTH} characters`,
    required: true,
    example: 'NestJS Devs Group',
  })
  @IsDefined()
  @IsString({ message: 'Group name must be a string' })
  @MinLength(NAME_MIN_LENGTH, {
    message: minLengthStringMessage('Group name', NAME_MIN_LENGTH),
  })
  @MaxLength(NAME_MAX_LENGTH, {
    message: maxLengthStringMessage('Group name', NAME_MAX_LENGTH),
  })
  @Matches(NAME_REGEXP, {
    message: 'Group name can contain just latin symbols, digits, underscores and single quotes',
  })
  @Transform(sanitizeStringIfNotNull)
  name: string;

  @ApiProperty({
    description: 'Array of valid roles in the group.',
    uniqueItems: true,
    example: [ ROLE.USER, ROLE.ADMIN ],
  })
  @IsOptional()
  @IsArray({ message: 'Roles must be an array' })
  @ArrayMaxSize(ROLE_ARRAY.length)
  @IsEnum(ROLE, {
    message: 'The role must be a valid value of the enum',
    each: true,
  })
  roles: ROLE[];
}

export class PartialGroupDto extends PartialType(GroupDto) {}

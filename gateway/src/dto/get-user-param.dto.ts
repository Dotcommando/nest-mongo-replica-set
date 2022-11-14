import { PickType } from '@nestjs/mapped-types';

import { UserDto } from '../common/dto';


export class GetUserParamDto extends PickType(UserDto, ['_id']) {}

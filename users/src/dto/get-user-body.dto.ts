import { PickType } from '@nestjs/mapped-types';

import { UserDto } from '../common/dto';


export class GetUserBodyDto extends PickType(UserDto, ['_id']) {}

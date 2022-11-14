import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { USERS_EVENTS } from './common/constants';
import { TcpCommonExceptionFilter } from './common/filters';
import { IResponse } from './common/types';
import { GroupsService } from './services';
import { ICreateGroupReq, ICreateGroupRes } from './types';

@UseFilters(new TcpCommonExceptionFilter())
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @MessagePattern(USERS_EVENTS.USER_CREATE_GROUP)
  public async createGroup(data: ICreateGroupReq): Promise<IResponse<ICreateGroupRes>> {
    return await this.groupsService.createGroup(data);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateGroupBodyDto } from './dto';
import { GroupsService } from './services';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
  ) {
  }

  @Post('one')
  public async createGroup(
    @Body() body: CreateGroupBodyDto,
  ) {
    return await this.groupsService.createGroup(body);
  }
}

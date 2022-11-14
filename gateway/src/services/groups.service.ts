import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom, timeout } from 'rxjs';

import { MAX_TIME_OF_REQUEST_WAITING, USERS_EVENTS } from '../common/constants';
import { IResponse } from '../common/types';
import { ICreateGroupReq, ICreateGroupRes } from '../types';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {
  }

  public async createGroup(data: ICreateGroupReq): Promise<IResponse<ICreateGroupRes>> {
    return await lastValueFrom(
      this.userServiceClient
        .send(USERS_EVENTS.USER_CREATE_GROUP, data)
        .pipe(timeout(MAX_TIME_OF_REQUEST_WAITING)),
    );
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';

import { ClientSession } from 'mongoose';

import { GroupsDbAccessService } from './groups-db-access.service';
import { UsersDbAccessService } from './users-db-access.service';

import { ROLE } from '../common/constants';
import { IGroup, IResponse, IUser } from '../common/types';
import { ICreateGroupReq, ICreateGroupRes } from '../types';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupsDbAccessService: GroupsDbAccessService,
    private readonly usersDbAccessService: UsersDbAccessService,
  ) {
  }

  public async createGroup(data: ICreateGroupReq): Promise<IResponse<ICreateGroupRes>> {
    const session: ClientSession = await this.groupsDbAccessService.startSession();

    try {
      const group: Omit<IGroup, '_id' | 'roles'> & { roles?: ROLE[] } = { ...data.group };

      session.startTransaction();

      const createGroupResponse: { group: IGroup } = await this.groupsDbAccessService.saveNewGroup({ group, session });

      if (!createGroupResponse.group) {
        await session.abortTransaction();
        await session.endSession();

        return {
          status: HttpStatus.PRECONDITION_FAILED,
          data: null,
          errors: ['Cannot create the group'],
        };
      }

      const updateUserResponse: { user: IUser } = await this.usersDbAccessService.updateUser({
        user: {
          _id: data._id,
          groups: {
            add: [{ group: createGroupResponse.group._id, role: ROLE.ADMIN }],
          },
        },
        session,
      });

      if (!updateUserResponse.user) {
        await session.abortTransaction();
        await session.endSession();

        return {
          status: HttpStatus.PRECONDITION_FAILED,
          data: null,
          errors: ['Cannot update the user'],
        };
      }

      await session.commitTransaction();
      await session.endSession();

      return {
        status: HttpStatus.OK,
        data: {
          group: createGroupResponse.group,
          user: updateUserResponse.user,
        },
        errors: null,
      };
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();

      return {
        status: HttpStatus.PRECONDITION_FAILED,
        data: null,
        errors: ['Transaction with a new group creating and the user updating failed'],
      };
    }
  }
}

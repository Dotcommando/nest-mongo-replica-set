import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import ObjectId from 'bson-objectid';

import { UsersDbAccessService } from './users-db-access.service';

import { AddressedErrorCatching, ApplyAddressedErrorCatching } from '../common/decorators';
import { IResponse, IUser } from '../common/types';

@ApplyAddressedErrorCatching
@Injectable()
export class UsersService {
  constructor(
    private readonly usersDbAccessService: UsersDbAccessService,
  ) {
  }

  @AddressedErrorCatching()
  public async getUser(data: { _id: string | ObjectId }): Promise<IResponse<{ user: IUser }>> {
    const user: IUser | null = await this.usersDbAccessService.findUserById(data._id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: HttpStatus.OK,
      data: { user },
      errors: null,
    };
  }

  public async createUser(
    user: Omit<IUser, '_id' | 'role' | 'groups' | 'emailConfirmed' | 'phoneConfirmed' | 'deactivated'>,
  ): Promise<IResponse<{ user: IUser }>> {
    const saveUserResponse: { user: IUser } = await this.usersDbAccessService.saveNewUser(user);

    if (!saveUserResponse.user) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        data: null,
        errors: ['Cannot save new user'],
      };
    }

    return {
      status: HttpStatus.OK,
      data: { user: saveUserResponse.user },
      errors: null,
    };
  }
}

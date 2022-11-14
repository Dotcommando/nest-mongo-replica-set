import ObjectId from 'bson-objectid';
import { ClientSession } from 'mongoose';

import { IGroupMembership, IUser } from '../common/types';

export interface IGroupsUpdates {
  add?: IGroupMembership[];
  remove?: ObjectId[];
  update?: IGroupMembership[];
}

export interface IUpdateUser extends Partial<Omit<IUser, '_id' | 'groups'>> {
  _id: IUser['_id'];
  groups: IGroupsUpdates;
}

export interface IUpdateUserReq {
  user: IUpdateUser;
  session: ClientSession;
}

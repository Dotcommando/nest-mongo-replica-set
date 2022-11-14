import ObjectId from 'bson-objectid';

import { ROLE } from '../constants';

export interface IGroupMembership<TGroup = ObjectId> {
  group: TGroup;
  role: ROLE;
}

export interface IUser {
  _id: ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  role: ROLE;
  groups: IGroupMembership[];
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  deactivated: boolean;
}

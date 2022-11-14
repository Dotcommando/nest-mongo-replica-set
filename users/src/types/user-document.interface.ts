import ObjectId from 'bson-objectid';
import { Document, HydratedDocument, QueryWithHelpers, Types } from 'mongoose';

import { IUser } from '../common/types';

export interface IUserDocument<T_id = Types.ObjectId> extends Omit<IUser, '_id'>, Document<T_id> {
  _id: | Document['_id'] | ObjectId;
  password: string;
  compareEncryptedPassword: (password: string) => boolean;
  getEncryptedPassword: (password: string) => string;
}

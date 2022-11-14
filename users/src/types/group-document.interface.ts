import ObjectId from 'bson-objectid';
import { Document, Types } from 'mongoose';

import { IGroup } from '../common/types';

export interface IGroupDocument<T_id = Types.ObjectId> extends Omit<IGroup, '_id'>, Document<T_id> {
  _id: | Document['_id'] | ObjectId;
}

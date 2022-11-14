import ObjectId from 'bson-objectid';

import { ROLE } from '../constants';

export interface IGroup {
  _id: ObjectId;
  name: string;
  roles: ROLE[];
}

import { ClientSession } from 'mongoose';

import { ROLE } from '../common/constants';
import { IGroup } from '../common/types';

export interface ISaveNewGroupReq {
  group: Omit<IGroup, '_id' | 'roles'> & { roles?: ROLE[] };
  session?: ClientSession;
}

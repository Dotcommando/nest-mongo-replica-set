import { ROLE } from '../common/constants';
import { IGroup } from '../common/types';

export const DEFAULT_GROUP_DATA: Omit<IGroup, '_id'> = {
  name: '',
  roles: [ROLE.ADMIN],
};

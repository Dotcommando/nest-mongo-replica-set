import { IGroup, IUser } from '../common/types';

export interface ICreateGroupReq {
  group: {
    name: IGroup['name'];
    roles?: IGroup['roles'];
  };
  _id: IUser['_id'];
}

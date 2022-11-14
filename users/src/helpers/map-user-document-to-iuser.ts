import { pickProps } from '../common/helpers';
import { IUser } from '../common/types';
import { IUserDocument } from '../types';

export function mapUserDocumentToIUser(userDoc: IUserDocument | IUser): IUser {
  return pickProps<IUser>(
    userDoc,
    '_id',
    'firstName',
    'middleName',
    'lastName',
    'username',
    'email',
    'phoneNumber',
    'role',
    'groups',
    'emailConfirmed',
    'phoneConfirmed',
    'deactivated',
  ) as IUser;
}

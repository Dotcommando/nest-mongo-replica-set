import ObjectId from 'bson-objectid';
import { Types, UpdateQuery } from 'mongoose';

import { pickProps } from '../common/helpers';
import { IGroupMembership, IUser } from '../common/types';
import { IGroupsUpdates, IUpdateUser, IUserDocument } from '../types';

export function getUserUpdates(userUpdates: IUpdateUser, oldUser: IUserDocument): UpdateQuery<IUser> {
  return {
    ...pickProps<IUpdateUser>(
      userUpdates,
      'firstName',
      'middleName',
      'lastName',
      'username',
      'email',
      'phoneNumber',
      'role',
      'emailConfirmed',
      'phoneConfirmed',
      'deactivated',
    ) as Omit<Partial<IUser>, '_id' | 'groups'>,
    ...(userUpdates.groups && {
      $set: { groups: getGroupsUpdates(oldUser.groups, userUpdates.groups) },
    }),
  };
}

export function getGroupsUpdates(groups: IGroupMembership<Types.ObjectId | ObjectId>[], updates: IGroupsUpdates): IGroupMembership<Types.ObjectId>[] {
  let resultGroups = groups.map((membership: IGroupMembership<Types.ObjectId>) => ({
    group: new Types.ObjectId(String(membership.group)),
    role: membership.role,
  }));

  if (!updates || (Boolean(updates) && !Object.keys(updates)?.length)) {
    return resultGroups;
  }

  if (updates.add?.length) {
    for (let i = 0; i < updates.add.length; i++) {
      resultGroups.push({
        group: new Types.ObjectId(String(updates.add[i].group)),
        role: updates.add[i].role,
      });
    }
  }

  if (updates.update?.length) {
    for (let i = 0; i < updates.update.length; i++) {
      const found = resultGroups
        .find((membership) => String(membership.group) === String(updates.update[i].group));

      if (!found) {
        continue;
      }

      found.role = updates.update[i].role;
    }
  }

  if (updates.remove?.length) {
    const idsToRemoveAsStrings = updates.remove.map((objectId) => String(objectId));

    resultGroups = resultGroups
      .filter((membership) => !idsToRemoveAsStrings.includes(String(membership.group)));
  }

  return resultGroups;
}

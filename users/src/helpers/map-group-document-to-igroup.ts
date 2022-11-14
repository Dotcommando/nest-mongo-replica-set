import { pickProps } from '../common/helpers';
import { IGroup } from '../common/types';
import { IGroupDocument } from '../types';

export function mapGroupDocumentToIGroup(groupDoc: IGroupDocument | IGroup): IGroup {
  return pickProps<IGroup>(
    groupDoc,
    '_id',
    'name',
    'roles',
  ) as IGroup;
}

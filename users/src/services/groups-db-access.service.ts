import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ClientSession, Model } from 'mongoose';

import { AddressedErrorCatching, ApplyAddressedErrorCatching } from '../common/decorators';
import { uniqueArray } from '../common/helpers';
import { IGroup } from '../common/types';
import { DEFAULT_GROUP_DATA } from '../constants';
import { mapGroupDocumentToIGroup } from '../helpers';
import { IGroupDocument, ISaveNewGroupReq } from '../types';

@ApplyAddressedErrorCatching
@Injectable()
export class GroupsDbAccessService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<IGroupDocument>,
  ) {
  }

  @AddressedErrorCatching()
  public async startSession(): Promise<ClientSession> {
    return this.groupModel.startSession();
  }

  public async saveNewGroup(data: ISaveNewGroupReq): Promise<{ group: IGroup }> {
    const { group, session } = data;

    try {
      const groupDoc: IGroupDocument = await new this.groupModel({
        ...DEFAULT_GROUP_DATA,
        ...group,
        roles: [
          ...DEFAULT_GROUP_DATA.roles,
          ...group.roles?.length
            ? group.roles
            : [],
        ].filter(uniqueArray),
      });
      const savedGroupDoc = await groupDoc.save(session ? { session } : {});

      return { group: mapGroupDocumentToIGroup(savedGroupDoc) };
    } catch (e) {
      return { group: null };
    }
  }
}

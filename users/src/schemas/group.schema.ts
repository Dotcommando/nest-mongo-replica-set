import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, NAME_REGEXP, ROLE_ARRAY } from '../common/constants';
import { IGroupDocument } from '../types';

export const GroupSchema = new Schema<IGroupDocument, mongoose.Model<IGroupDocument>>(
  {
    name: {
      type: String,
      required: [ true, 'Group name is required' ],
      minLength: NAME_MIN_LENGTH,
      maxLength: NAME_MAX_LENGTH,
      match: [ NAME_REGEXP, 'Group name can contain just latin symbols, digits, underscores and single quotes' ],
    },
    roles: {
      type: [String],
      enum: ROLE_ARRAY,
    },
  },
);

export const GroupModel = mongoose.model<IGroupDocument, mongoose.Model<IGroupDocument>>('Group', GroupSchema);

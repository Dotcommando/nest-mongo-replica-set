import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupsController } from './groups.controller';
import { GroupSchema, UserSchema } from './schemas';
import { GroupsService, MongoConfigService, UsersDbAccessService, UsersService } from './services';
import configuration from './services/config';
import { GroupsDbAccessService } from './services/groups-db-access.service';
import { UsersController } from './users.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Group',
        schema: GroupSchema,
        collection: 'groups',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [ GroupsController, UsersController ],
  providers: [
    GroupsDbAccessService,
    UsersDbAccessService,
    GroupsService,
    UsersService,
  ],
})
export class UsersModule {}

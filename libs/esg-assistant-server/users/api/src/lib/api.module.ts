import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import {
  CreateUserUseCase,
  GetUserUseCase,
  UserService,
} from '@esg-assistant-server/users/application';
import { USER_REPOSITORY } from '@esg-assistant-server/users/domain';
import {
  UserMongooseRepository,
  UserSchema,
} from '@esg-assistant-server/users/infrastructure';
import { JwtModule } from '@shared-server/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    GetUserUseCase,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserMongooseRepository,
    },
  ],
  exports: [UserService, CreateUserUseCase, GetUserUseCase],
})
export class UserModule {}

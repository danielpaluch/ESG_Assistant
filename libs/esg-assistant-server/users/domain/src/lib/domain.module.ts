import { USER_REPOSITORY } from './ports/user-repository.port';
import { Module } from '@nestjs/common';
import { UserMongooseRepository } from '@esg-assistant-server/users/infrastructure';

@Module({
  controllers: [],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserMongooseRepository,
    },
  ],
  imports: [],
  exports: [USER_REPOSITORY],
})
export class UserDomainModule {}

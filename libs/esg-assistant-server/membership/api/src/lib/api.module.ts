import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipController } from './controllers/membership.controller';
import {
  AcceptMembershipUseCase,
  CreateMembershipUseCase,
  DenyMembershipUseCase,
  GetMembershipUseCase,
  MembershipService,
} from '@esg-assistant-server/membership/application';
import { MEMBERSHIP_REPOSITORY } from '@esg-assistant-server/membership/domain';
import {
  MembershipMongooseRepository,
  MembershipSchema,
} from '@esg-assistant-server/membership/infrastructure';
import { UserSchema } from '@esg-assistant-server/users/infrastructure';
import { JwtModule } from '@shared-server/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Membership', schema: MembershipSchema },
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule,
  ],
  controllers: [MembershipController],
  providers: [
    MembershipService,
    GetMembershipUseCase,
    CreateMembershipUseCase,
    AcceptMembershipUseCase,
    DenyMembershipUseCase,
    {
      provide: MEMBERSHIP_REPOSITORY,
      useClass: MembershipMongooseRepository,
    },
  ],
  exports: [
    MembershipService,
    GetMembershipUseCase,
    CreateMembershipUseCase,
    AcceptMembershipUseCase,
    DenyMembershipUseCase,
  ],
})
export class MembershipModule {}

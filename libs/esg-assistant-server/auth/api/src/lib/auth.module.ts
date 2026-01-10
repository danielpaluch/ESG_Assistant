import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@shared-server/jwt';
import { AuthApplicationModule } from '@esg-assistant-server/auth/application';

@Module({
  imports: [JwtModule, AuthApplicationModule],
  providers: [],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

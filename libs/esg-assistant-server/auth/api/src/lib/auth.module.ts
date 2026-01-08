import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth0AuthenticationClient } from '@esg-assistant/shared-server/auth0';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@esg-assistant-server/users/api';
import { JwtModule } from '@shared-server/jwt';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, JwtModule],
  providers: [
    {
      provide: Auth0AuthenticationClient,
      useFactory: (config: ConfigService) =>
        new Auth0AuthenticationClient({
          domain: config.getOrThrow<string>('AUTH0_DOMAIN'),
          clientId: config.getOrThrow<string>('AUTH0_AUTH_CLIENT_ID'),
          clientSecret: config.getOrThrow<string>('AUTH0_AUTH_CLIENT_SECRET'),
          mgmt_audience: config.getOrThrow<string>('AUTH0_AUTH_MGMT_AUDIENCE'),
          mgmt_clientId: config.getOrThrow<string>('AUTH0_AUTH_MGMT_ID'),
          mgmt_clientSecret: config.getOrThrow<string>(
            'AUTH0_AUTH_MGMT_SECRET',
          ),
        }),
      inject: [ConfigService],
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

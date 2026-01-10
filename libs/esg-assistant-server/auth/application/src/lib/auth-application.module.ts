import { Module } from '@nestjs/common';
import { UsersApplicationAdapter } from './adapters/users-application.adapter';
import { AUTH_USERS_PORT } from '@esg-assistant-server/auth/domain';
import { AuthService } from './services/auth.service';
import { UserModule } from '@esg-assistant-server/users/api';
import { JwtModule } from '@shared-server/jwt';
import { Auth0AuthenticationClient } from '@esg-assistant/shared-server/auth0';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, JwtModule],
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
    UsersApplicationAdapter,
    {
      provide: AUTH_USERS_PORT,
      useClass: UsersApplicationAdapter,
    },
    AuthService,
  ],
  controllers: [],
  exports: [AuthService],
})
export class AuthApplicationModule {}

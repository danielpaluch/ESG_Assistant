import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { CompanyModule } from '@esg-assistant-server/company/api';
import { AuthModule } from '@esg-assistant-server/auth/api';
import { UserModule } from '@esg-assistant-server/users/api';
import { JwtModule } from '@shared-server/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CompanyModule,
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

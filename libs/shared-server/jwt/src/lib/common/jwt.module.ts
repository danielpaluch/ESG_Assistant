import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [JwtAuthStrategy, JwtAuthGuard],
  controllers: [],
  exports: [JwtAuthStrategy, JwtAuthGuard],
})
export class JwtModule {}

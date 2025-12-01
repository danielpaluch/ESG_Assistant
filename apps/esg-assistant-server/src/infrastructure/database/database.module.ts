import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';

@Module({
  imports: [
    /* Register config as part of ConfigModule */
    ConfigModule.forFeature(databaseConfig),

    /* Async configuration */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database');

        return {
          uri: db.uri,
          ...db.options,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

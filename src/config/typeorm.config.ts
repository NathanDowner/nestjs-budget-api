import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'sqlite',
    database: config.get<string>('DB_NAME'),
    entities: [__dirname + '../**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
};
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  synchronize: true,
};

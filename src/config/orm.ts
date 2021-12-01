import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const ORMConfig = {
  type: 'postgres',

  host: 'localhost',
  port: 5432,
  username: 'test-task',
  password: 'qwerty',
  database: 'test-task',

  namingStrategy: new SnakeNamingStrategy(),

  entities: ['dist/**/*.entity{.ts,.js}'],

  migrationsTableName: 'migrations',

  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,

  cli: {
    migrationsDir: 'src/migrations',
  },
  dropSchema: false,
  synchronize: false,
  ssl: false,
} as ConnectionOptions;

export = ORMConfig;
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:123456@localhost:5432/projects',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
};

import path from 'node:path';

import { baseOrmconfig } from 'back-shared-utils/lib/configs';
import { getCacheConfig } from 'back-shared-utils/lib/utils';
import { DataSourceOptions } from 'typeorm';

const ormconfig: DataSourceOptions = {
  ...baseOrmconfig,
  entities: [path.join(__dirname, '..', 'modules', '/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '/**/*.{ts,js}')],
  cache: getCacheConfig(),
};

export default ormconfig;

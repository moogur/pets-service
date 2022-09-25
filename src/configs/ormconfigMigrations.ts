import { DataSource } from 'typeorm';

import ormconfig from './ormconfig';

const ormconfigMigration = new DataSource(ormconfig);

export default ormconfigMigration;

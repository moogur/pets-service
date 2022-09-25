import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from '@configs/ormconfig';
import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [ModulesModule, TypeOrmModule.forRoot(ormconfig)],
})
export class MainModule {}

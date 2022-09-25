import { Module } from '@nestjs/common';

import { AppModule } from './app';

@Module({
  imports: [AppModule],
})
export class ModulesModule {}

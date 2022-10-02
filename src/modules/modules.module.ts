import { Module } from '@nestjs/common';

import { PetsModule } from './pets';

@Module({
  imports: [PetsModule],
})
export class ModulesModule {}

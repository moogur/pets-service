import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'back-shared-utils/lib/middlewares';

import { PetsModule } from './pets';

@Module({
  imports: [PetsModule],
})
export class ModulesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '/pets', method: RequestMethod.ALL });
    consumer.apply(AuthMiddleware).forRoutes({ path: '/pets/*', method: RequestMethod.ALL });
  }
}

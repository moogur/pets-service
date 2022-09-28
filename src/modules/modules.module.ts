import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserAuthMiddleware } from 'back-shared-utils/lib/middlewares';

import { PetsModule } from './pets';

@Module({
  imports: [PetsModule],
})
export class ModulesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes({ path: '/pets', method: RequestMethod.ALL });
    consumer.apply(UserAuthMiddleware).forRoutes({ path: '/pets/*', method: RequestMethod.ALL });
  }
}

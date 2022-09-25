import { NestFactory } from '@nestjs/core';
import { ProcessEnvironmentKeys } from 'back-shared-utils/lib/types';
import { setEnvironments, setupSwagger } from 'back-shared-utils/lib/utils';

import { filePaths } from '@shared/const';

import { AppModule } from './app.module';

try {
  setEnvironments(filePaths.env.serviceToken);
} catch (error) {
  console.log(error);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupSwagger({
    app,
    swaggerTitle: 'Pets API',
    swaggerDescription: 'The pets API description<br /><br /><b>Authorization token is in cookies</b>',
    needBearerAuth: true,
  });

  const port = process.env[ProcessEnvironmentKeys.Port] ? Number(process.env[ProcessEnvironmentKeys.Port]) : 3000;
  await app.listen(port, () => console.log(`application is running on ${port} port`));
}

bootstrap();

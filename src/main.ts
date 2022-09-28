import path from 'node:path';

import { NestFactory } from '@nestjs/core';
import { ProcessEnvironmentKeys } from 'back-shared-utils/lib/types';
import { setEnvironments, setupSwagger } from 'back-shared-utils/lib/utils';

import { MainModule } from './main.module';

try {
  const filePath = path.join(__dirname, '..', 'env', '.service-token.env');
  setEnvironments(filePath);
  process.env[ProcessEnvironmentKeys.ServiceTokenFilePath] = filePath;
} catch (error) {
  console.log(error);
}

async function bootstrap() {
  const app = await NestFactory.create(MainModule, { cors: true });

  setupSwagger({
    app,
    swaggerTitle: 'Pets API',
    swaggerDescription: 'The pets API description<br /><br /><b>Authorization token is in cookies</b>',
  });

  const port = process.env[ProcessEnvironmentKeys.Port] ? Number(process.env[ProcessEnvironmentKeys.Port]) : 3000;
  await app.listen(port, () => console.log(`application is running on ${port} port`));
}

bootstrap();

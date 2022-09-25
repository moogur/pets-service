import path from 'node:path';

export const filePaths = {
  env: {
    serviceToken: path.join(__dirname, '..', '..', '..', 'env', '.service-token.env'),
  },
} as const;

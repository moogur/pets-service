# Set node version
ARG ARG_NODE_VERSION

# First stage to build
FROM mhart/alpine-node:${ARG_NODE_VERSION} as builder

WORKDIR /usr/src

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf node_modules
RUN npm ci --only=production

# Second stage to run
FROM mhart/alpine-node:slim-${ARG_NODE_VERSION}

WORKDIR /usr/app

COPY --from=builder /usr/src/node_modules /usr/app/node_modules
COPY --from=builder /usr/src/dist /usr/app/dist

ARG ARG_APP_VERSION
ENV APP_VERSION=${ARG_APP_VERSION}

CMD node node_modules/typeorm/cli.js --dataSource=dist/configs/ormconfigMigrations.js migration:run && \
  node dist/main

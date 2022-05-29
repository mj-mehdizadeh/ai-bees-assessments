FROM node:14.17.3-alpine AS base

RUN npm install pm2 -g

RUN mkdir -p /myapp
WORKDIR /myapp

COPY . ./

### Build Stage
FROM base AS build
RUN npm install -g typescript
RUN yarn
RUN npm run build
RUN yarn --production

### Release Stage
FROM base AS release
COPY --from=build /myapp /myapp

ENV PM2_HOME="/tmp/pm2"

EXPOSE 3000
ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]

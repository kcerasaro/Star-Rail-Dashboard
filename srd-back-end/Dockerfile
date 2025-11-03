FROM node:18-alpine

RUN apk add --no-cache dumb-init

WORKDIR /app

COPY ./shared/ ./shared/

COPY ./srd-back-end/package.json ./srd-back-end/

RUN corepack enable

WORKDIR /app/srd-back-end
RUN pnpm install

COPY ./srd-back-end/ ./

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start:dev"]
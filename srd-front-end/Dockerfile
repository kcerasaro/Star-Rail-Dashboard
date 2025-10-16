FROM node:22-alpine

RUN apk add --no-cache dumb-init

WORKDIR /app

COPY ./shared/ ./shared/

COPY ./srd-front-end/package.json ./srd-front-end/

RUN corepack enable

WORKDIR /app/srd-front-end
RUN pnpm install

COPY ./srd-front-end/ ./

# EXPOSE 5173
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "run", "dev", "--", "--host"]
FROM node:18-alpine

WORKDIR /app

COPY ./srd-back-end/ ./srd-back-end/
COPY ./shared/ ./shared/

WORKDIR /app/srd-back-end

ENV CI=true  

RUN corepack enable && pnpm install

EXPOSE 3000

CMD ["pnpm", "start:dev"]

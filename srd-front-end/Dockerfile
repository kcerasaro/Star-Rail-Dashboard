FROM node:22-alpine

WORKDIR /app

COPY ./srd-front-end/ ./srd-front-end/
COPY ./shared/ ./shared/

WORKDIR /app/srd-front-end

ENV CI=true  

RUN corepack enable && pnpm install

EXPOSE 5173

CMD ["pnpm", "run", "dev"]

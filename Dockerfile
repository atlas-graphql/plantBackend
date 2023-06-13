FROM node:18
LABEL authors="eigilkjaerulff"


COPY package*.json ./

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node . .

RUN npm install -g ts-node

RUN pnpm install

COPY . .

CMD ["pnpm seed"]

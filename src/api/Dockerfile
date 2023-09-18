FROM node:18
LABEL authors="eigilkjaerulff"


COPY package*.json ./

RUN curl -fsSL https://get.pnpm.io/install.sh | sh - | node - add --global pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node . .

RUN npm install -g ts-node

RUN pnpm install

COPY . .


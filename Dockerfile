# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: desarrollo
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install                    # ✅ instala también @types/node
RUN npm install -g @nestjs/cli     # para que funcione nest start:dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

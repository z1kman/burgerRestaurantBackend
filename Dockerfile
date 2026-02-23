FROM node:20-slim

RUN apt-get update -y && apt-get install -y \
    openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN node build.js

EXPOSE 4000

CMD ["node", "dist/index.js"]
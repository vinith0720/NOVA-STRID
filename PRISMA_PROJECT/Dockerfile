FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./prisma ./prisma

# COPY .env .env

EXPOSE 3000

CMD ["npm","run", "start"]

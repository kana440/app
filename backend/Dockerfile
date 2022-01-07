FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install
#RUN apk add --no-cache make gcc g++ python3 && \
#  npm install && \
#  npm rebuild bcrypt --build-from-source && \
#  apk del make gcc g++ python3

COPY . .

RUN npm run build
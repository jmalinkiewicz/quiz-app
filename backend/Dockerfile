FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG DATABASE_URL
ARG SECRET_KEY

ENV DATABASE_URL=${DATABASE_URL}
ENV SECRET_KEY=${SECRET_KEY}

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

RUN npx prisma generate
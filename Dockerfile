FROM node:8.0.0

WORKDIR /app

COPY package.json yarn.lock /

RUN yarn --production

COPY . .

USER node

CMD npm start
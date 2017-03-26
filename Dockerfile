FROM mhart/alpine-node:7.7.3

WORKDIR /app

COPY package.json .

RUN npm i pm2 -g -q --production \
    npm i -q --production

COPY . .

CMD npm start
FROM mhart/alpine-node:6.10.0

WORKDIR /wiremock

COPY package.json .

RUN npm i --production -q

COPY . .

CMD npm start
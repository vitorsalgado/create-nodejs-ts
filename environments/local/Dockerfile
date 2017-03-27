FROM mhart/alpine-node:7.7.3

WORKDIR /api

RUN chown -R 1000:1000 /api
RUN npm i nodemon -g

VOLUME /api

CMD npm run start-dev
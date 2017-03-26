FROM mhart/alpine-node:6.10.0

WORKDIR /app

RUN npm i nodemon -g \
    chown -R 1000:1000 /app

VOLUME /app

CMD npm run start-dev
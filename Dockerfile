# -----
# build environment

FROM node:8.11.0 AS build-env

ENV YARN_VERSION 1.5.1
RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION /opt/yarn \
    && rm yarn-v$YARN_VERSION.tar.gz

WORKDIR /app
COPY package.json package-lock.json yarn.lock ./
RUN yarn install --production
COPY . .

# -----
# final image

FROM node:8.11.0-slim
COPY --from=build-env /app /app
WORKDIR /app
USER node
CMD ./node_modules/pm2/bin/pm2-runtime index.config.js --no-daemon

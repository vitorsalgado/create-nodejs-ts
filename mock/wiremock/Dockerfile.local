FROM java:alpine

WORKDIR /app

COPY wiremock.jar .

VOLUME /app/data

CMD java -jar wiremock.jar --root-dir data --port=3000 --verbose
FROM java:alpine

WORKDIR /wiremock

COPY . .

CMD java -jar wiremock.jar --root-dir data --port=3000 --verbose
FROM java:alpine

WORKDIR /wiremock

COPY . .

CMD java -jar wiremock.jar --root-dir data --port=8081 --verbose
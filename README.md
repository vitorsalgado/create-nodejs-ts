# Node.js Boilerplate Application
[![Build Status](https://travis-ci.org/vitorsalgado/nodejs-bootstrap.svg?branch=master)](https://travis-ci.org/vitorsalgado/nodejs-bootstrap) 
[![Coverage Status](https://coveralls.io/repos/github/vitorsalgado/nodejs-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/vitorsalgado/nodejs-bootstrap?branch=master)
[![Code Climate](https://codeclimate.com/github/vitorsalgado/nodejs-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/vitorsalgado/nodejs-bootstrap)
[![node version][node-image]][node-url]
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[node-image]: https://img.shields.io/badge/node.js-%3E=_7.7.3-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/release/v7.7.3/

Node.js boilerplate application based on Koa framework. Useful to start a new project with a complete infrastructure set.  
It comes with pre-defined architecture to set new routes with validation on both request and responses in a way similar to Hapi.  
The application is ready to use several Continuous Integration solutions like Travis, Wercker and even Bitbucket Pipelines.

## Libraries
[![Dependency Status](https://david-dm.org/vitorsalgado/nodejs-bootstrap.svg)](https://david-dm.org/vitorsalgado/nodejs-bootstrap)
[![devDependency Status](https://david-dm.org/vitorsalgado/nodejs-bootstrap/dev-status.svg)](https://david-dm.org/vitorsalgado/nodejs-bootstrap#info=devDependencies)

The libraries and tools used include: 
* [Koa](https://github.com/koajs/koa);
* [Koa Router](https://github.com/alexmingoia/koa-router) for routing;
* [Joi](https://github.com/hapijs/joi) for schema validations;
* [Jest](http://facebook.github.io/jest/) for **unit tests**;
* [Nodemon](https://github.com/remy/nodemon);
* [NSP](https://github.com/nodesecurity/nsp) and [Snyk](https://snyk.io/) for **security analysis**;
* [ESLint](http://eslint.org/) for **linting**;
* [Swagger](http://swagger.io/) for interactive documentation;
* [Wiremock](http://wiremock.org/) for API mock;
* [Travis CI](https://travis-ci.org/);
* [Circle CI](https://circleci.com);
* [Bitbucket Pipelines](https://confluence.atlassian.com/bitbucket/bitbucket-pipelines-792496469.html);
* [Wercker](http://www.wercker.com/).

## Requirements
* [Yarn](https://yarnpkg.com/en/) for package management;
* [NVM (Node Version Manager)](https://github.com/creationix/nvm) for managing Node.js versions;
* [Node.js >= v7.7.3](https://nodejs.org/en/);
* [Docker](https://www.docker.com/);
* [Docker Compose](https://docs.docker.com/compose/).
 
## Code Quality
[![codebeat badge](https://codebeat.co/badges/3d39baa4-d902-4648-9c5e-6ba5641a7924)](https://codebeat.co/projects/github-com-vitorsalgado-nodejs-bootstrap-master)
[![Known Vulnerabilities](https://snyk.io/test/github/vitorsalgado/nodejs-bootstrap/badge.svg)](https://snyk.io/test/github/vitorsalgado/nodejs-bootstrap)  

This project comes with a combination of unit tests, code analysis tools and a API mock already set.  
They are all integrated in Travis CI execution pipeline.  
To run all test and local analysis tools at once, run:  
```
npm run test-dev
```
Check `package.json` scripts section for more details. 
 
### Security Analysis
```
npm run security-check
```

## API Mock
The project comes with **WireMock** already set to easy mock external API calls. It also comes with a small Node.js application that automatic 
restarts WireMock every time a mapping or response json is changed.

## Continuous Integration and Delivery
[![CircleCI](https://circleci.com/gh/vitorsalgado/nodejs-bootstrap.svg?style=svg)](https://circleci.com/gh/vitorsalgado/nodejs-bootstrap)
[![wercker status](https://app.wercker.com/status/c5e74070b99d0d5d8aac85e23e7852b8/s/master "wercker status")](https://app.wercker.com/project/byKey/c5e74070b99d0d5d8aac85e23e7852b8)  

Though more than one CI solution are being used in this project, [Travis CI](https://travis-ci.org/) is the main and the one which Continuous Delivery is setup. 
All tests and local code analysis tools are integrated in Travis pipeline.  
After successfully pass all tests and code analysis, the application is deployed to [Heroku](https://www.heroku.com/) and [Docker Hub](https://hub.docker.com/) using Docker.

[Check it out in Heroku Cloud](https://nodejs-boilerplate-koa.herokuapp.com/)

## License
```
Copyright 2017 Vitor Hugo Salgado

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
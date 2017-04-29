# Node.js Boilerplate Application
[![Build Status](https://travis-ci.org/vitorsalgado/nodejs-bootstrap.svg?branch=master)](https://travis-ci.org/vitorsalgado/nodejs-bootstrap) 
[![Coverage Status](https://coveralls.io/repos/github/vitorsalgado/nodejs-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/vitorsalgado/nodejs-bootstrap?branch=master)
[![Code Climate](https://codeclimate.com/github/vitorsalgado/nodejs-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/vitorsalgado/nodejs-bootstrap)
[![node version][node-image]][node-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_7.9.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/release/v7.9.0/

Node.js boilerplate application based on Koa framework.  

The goal of this project is to have a base from where projects should start with basic configurations already set.  
It comes with a simple framework for rest APIs build on top of Koa, Joi and some other libraries. 

## Libraries and Tools
[![Dependency Status](https://david-dm.org/vitorsalgado/nodejs-bootstrap.svg)](https://david-dm.org/vitorsalgado/nodejs-bootstrap)
[![devDependency Status](https://david-dm.org/vitorsalgado/nodejs-bootstrap/dev-status.svg)](https://david-dm.org/vitorsalgado/nodejs-bootstrap#info=devDependencies)

libraries included:
* [Koa](https://github.com/koajs/koa);
* [Koa Router](https://github.com/alexmingoia/koa-router) for routing;
* [Joi](https://github.com/hapijs/joi) for schema validations;
* [Jest](http://facebook.github.io/jest/) for **unit tests**;
* [Nodemon](https://github.com/remy/nodemon);
* [NSP](https://github.com/nodesecurity/nsp) and [Snyk](https://snyk.io/) for **security analysis**;
* [ESLint](http://eslint.org/) for **linting**.

Tools and other stuffs:
* [Yarn](https://yarnpkg.com/en/) for package management;
* [Docker](https://www.docker.com/);
* [Docker Compose](https://docs.docker.com/compose/);
* [Swagger](http://swagger.io/) for interactive documentation.
 
## Code Quality
[![codebeat badge](https://codebeat.co/badges/3d39baa4-d902-4648-9c5e-6ba5641a7924)](https://codebeat.co/projects/github-com-vitorsalgado-nodejs-bootstrap-master)
[![Known Vulnerabilities](https://snyk.io/test/github/vitorsalgado/nodejs-bootstrap/badge.svg)](https://snyk.io/test/github/vitorsalgado/nodejs-bootstrap)  
This project comes with a combination of unit tests, code analysis tools, security checkup for packages.    
They are all integrated in Travis CI execution pipeline. 

## API Mock
The project comes with **WireMock** already set to easy mock external API calls. It also comes with a small Node.js application that automatic 
restarts WireMock every time a mapping or response json is changed.  
See [WireMock](http://wiremock.org/) for more details.  

## Continuous Integration and Delivery
[Travis CI](https://travis-ci.org/) is the solution for Continuous Delivery.   
All tests and local code analysis tools are integrated in Travis pipeline.  
After successfully pass all tests and code analysis, the application is deployed to [Heroku](https://www.heroku.com/) and [Docker Hub](https://hub.docker.com/) using Docker.

## License
This project is available under Apache Public License version 2.0. See [LICENSE](LICENSE).

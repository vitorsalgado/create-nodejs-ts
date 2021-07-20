<h1 align="center">Node.js Starter ToolKit</h1>

<p align="center">
    <img src="docs/assets/logo.png" alt="Logo" />
    <br/>
    <i>Starter Project for a Node.js application using <strong>TypeScript</strong> with all boring stuff already configured.</i>
</p>

<p align="center">
  <a href="https://github.com/vitorsalgado/nodejs-boilerplate/actions/workflows/ci.yml">
    <img src="https://github.com/vitorsalgado/nodejs-boilerplate/actions/workflows/ci.yml/badge.svg">
  </a>&nbsp
  <a href="https://codecov.io/gh/vitorsalgado/nodejs-boilerplate">
    <img src="https://codecov.io/gh/vitorsalgado/nodejs-boilerplate/branch/master/graph/badge.svg?token=2Z4IBUTP6P"/>
  </a>&nbsp
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"/>
  </a>&nbsp
</p>

## Overview

Starter project for **Node.js** applications using **TypeScript** with Test, Lint, Code Style already configured. Take a
look below for all the tooling available in this repository.  
This project can be used as a template using GitHub feature with the same name, or using the `npm init` functionality.  
You can execute the following command:

```
npm init nodejs-ts
```

Without parameters, the project will be created on a folder **my-app** in the same directory where you executed the
command.  
All parameters available:

```
--destination=<FOLDER_DESTINATION> Defaults to the current directory
--app=<APP_NAME> Defaults to my-app
```

The final folder will the parameter `destination` concatenated with parameter `app`.

## Tooling

- TypeScript
- EsLint
- Husky
- Commit Lint
- Lint Staged
- Prettier
- Standard Version
- Nodemon
- Docker

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvitorsalgado%2Fnodejs-boilerplate.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fvitorsalgado%2Fnodejs-boilerplate?ref=badge_shield)

This project is [MIT Licensed](LICENSE).

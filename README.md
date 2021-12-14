# Hamburger 🍔🍔

A template for fullstack projects

> a burger without cheese is like a hug without a squeeze.

### 😎 Guide

The monorepo structure is managed with [Lerna](https://lerna.js.org/) and created out of the [Renli Monorepo Template](https://github.com/renli-tech/monorepo)

### Packages

This is a list of all the packages in the repo and what they are used for.

| Package                          | Description                                         |
| -------------------------------- | --------------------------------------------------- |
| [bun]("./packages/bun/")         | React Web App                                       |
| [meat]("./packages/meat/")       | Expo React Native App                               |
| [cheese]("./packages/cheese/")   | NodeJS Server with GraphQl and Express              |
| [ketchup]("./packages/ketchup/") | Contains Hooks and other common functions           |
| [lettuce]("./packages/lettuce/") | Contains GraphQL CodeGen Hooks and Type Definitions |
| [recipe]("./packages/recipe/")   | Contains Themes, Colors and Design System           |

#### 😋 Features

- [Eslint](https://eslint.org/) - For linting code
- [Typescript](https://www.typescriptlang.org/) - As programming language
- [GraphQL](https://graphql.org) - For Data Query
- [React](https://reactjs.org) - As Web Framework
- [React Native](https://reactnative.dev) - As Mobile App Framwork
- [Expo](https://expo.dev) - For managed workflow in React Native
- [Apollo Federation](https://www.apollographql.com/docs/federation/) - For Managing GraphQL Schema
- [Husky](https://typicode.github.io/husky/#/) - For running pre-commit hooks
- [Jest](https://jestjs.io/) - For testing
- [Rollup]() - For bundling packages
- [Prettier](https://prettier.io/) - For writing neat code
- [Commitlint](https://commitlint.js.org/#/) - For linting commit messages

#### Commands

To start working with a project built with this template

Run this command to bootstrap all the packages and install the dependencies

```sh

yarn bootstrap

```

#### Testing

Run this command to run all test

```sh

yarn run test

```

View the [lerna docs](https://lerna.js.org/) to see other commands

This template is maintained by [Renli](https://github/renli-tech)

Licence [MIT](./LICENSE)

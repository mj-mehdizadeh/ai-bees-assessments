## Description

Ai Bees assessment for Mohammad Javad.
this application is from my [previous project](https://github.com/mj-mehdizadeh/march-health) and I removed unused modules and code for simplicity. 
before start the project, create `.env` file from `.example.env` and set `MONGO_URL` with your database url, 
import data from `database` folder to your mongoDB database.
the application has 3 parts **auth**, **categories**, **products**.

### Auth
the authentication and authorization api's, you can call `/auth/register api` to register new user and then
call `/auth/login api` and get an `access_token` to set Authorization header.

### Categories
creating new category, you need to be authenticated.

### Product
 I used `graphLookup` (mongoDB aggregation method) to find all parents of the given category and get the discount. I set `maxDepth: 2`  option
for simplicity. 

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

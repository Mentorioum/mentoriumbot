# mentoriumbot

## Configure app

Copy '.env.sample' to '.env'

Replace with your env variables

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Heroku

### Pause/Resume App

```
# pause app
heroku ps:scale web=0


# resume app
heroky ps:scale web=1

``




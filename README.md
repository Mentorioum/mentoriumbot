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


1. [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch1.md)[~3h]
1. [Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started/ch2.md)[~3h]
1. [Interview Checkpoint](mentorium://nesterone@verification)

## Heroku

### Pause/Resume App

```
# pause app
heroku ps:scale web=0


# resume app
heroky ps:scale web=1

```

### Deploy

```
git push heroku master
```



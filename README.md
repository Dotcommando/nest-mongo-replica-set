<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) based example of API. Uses Mongo DB in replica set mode from Docker Compose. It's an example just for development.

**Ports in use**: **9000**, **9001**, **27048**.

Port 9000: _gateway_ microservice.

Port 9001: _users_ microservice.

Port 27048: _Mongo DB_ in Docker in replica set mode.

## How to run

**First of all**, in directories `gateway` and `users` rename files `.env.example` to `.env`.

Gateway microservice:

```bash
# gateway
$ cd gateway
$ npm install
$ npm run start:dev
```

Users microservice:

```bash
# users
$ cd users
$ npm install
$ npm run generate:key
$ npm run db:up
$ npm run rs:init
$ npm run start:dev
```

## Postman calls

Upload file `./nest_mongo_rs.postman_collection.json`  from the root directory of the repo to your local Postman. Then run calls sequentially: Post Create User, Get User By Id, Post Create Group. The last one uses Mongo transactions. Its successful execution is a signal that Mongo is running in replica set mode locally, in Docker Compose.

## Mongo DSN

To have a look on Mongo DB collections:

    mongodb://dotcommando:dotcommando@localhost:27048/ms-users?authSource=admin&replicaSet=rs0

## Commands in Users microservice

Before the first run of replica set you should generate a key:

```bash
$ npm run generate:key
```

After key generation up the Docker Compose with Mongo in replica set mode:

```bash
$ npm run db:up
```

You can stop this service:

```bash
$ npm run db:stop
```

Or fully remove:

```bash
$ npm run db:rm
```

After you run DB with command `npm run db:up` you should initialize replica set mode:

```bash
$ npm run rs:init
```

To check if replica set is OK:

```bash
$ npm run rs:conf
```

## License

The boilerplate is MIT licensed.

Author: Mikhail Filchushkin.

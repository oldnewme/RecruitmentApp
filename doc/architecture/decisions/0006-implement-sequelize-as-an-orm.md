# 6. Implement sequelize as an ORM

Date: 2021-02-15

## Status

Accepted

## Context

There is a need to communicate with the implemented PostgreSQL database management system. Sequelize is a promise-based Node.js ORM for amongst other Postgres servers. It features transaction support, relations, eager and lazy loading, read replication and more.

## Decision

The project will use Sequelize v6 for ORM.

## Consequences

Development will be simplified since no SQL queries are needed and communication with database is done through the Sequelize API. Also transaction management is greatly simplified since it is also handled by Sequelize.

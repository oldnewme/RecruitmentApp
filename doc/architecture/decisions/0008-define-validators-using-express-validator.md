# 8. Define validators using express-validator

Date: 2021-02-19

## Status

Accepted

## Context

To ensure that only valid values are entered in the database some form of validation is needed in at least view and integration layers. This can be done using a predfined package, self written validators or a combination. The express web development framework provides the express-validator package which is widely adopted and maintained. 

## Decision

Valdation of data will be made using the express-validator package in combination with selfdeveloped validators in view and integration layers.

## Consequences

The decision will reduce the chance of malformed data entering the database. By combining the predefined validators in the express-validator package and adding some functionality specific for this project, speed of development is improved as well as validator robustness.

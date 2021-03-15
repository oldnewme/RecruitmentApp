# 9. Use json web tokens for authentication and authorization

Date: 2021-02-25

## Status

Accepted

## Context

The application will need a way to authenticate as well as authorize both applicants and recruiters. This can be done in a variety of ways. One common way is to implement the use of json web tokens which are keys that can be digitally and cryptographically signed to authorize and authenticate users.

## Decision

json web tokens will be used to authenticate and authorize users by implementing the jsonwebtoken package in npm.

## Consequences

By using the decided package the project can be sure that high quality authentication and authorization can be implemented by interfacing with an easily understandable api. The package is downloaded millions of times per week and there is a large community of users and developers maintaining the package as well.
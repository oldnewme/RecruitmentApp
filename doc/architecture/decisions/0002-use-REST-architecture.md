# 2. Use REST architecture

Date: 2021-02-01

## Status

Accepted

## Context

Since the services we develop must be possible to call when needed we must provide a way to do so. The REST architectural style is widely used that uses statless communcation, a uniform constrained interface and addressable resources. As it is recognizable among many developers this is a great alternative for our project.

## Decision

A REST architecture will be used for the application that is to be devloped.

## Consequences

By implementing a REST architecture we have a widely adopted architecture which is known by both ourselves and future developers of the project. It will also be interoperable with any http client. The stateless nature also makes it possible to serve any client from any server.
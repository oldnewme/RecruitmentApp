# 15. Implement assert for assertions for validation of received data

Date: 2021-03-01

## Status

Accepted

## Context

When data is sent to the database for storage, we want to be sure that it is stored in such a way that makes it possible to process it easily.
Making sure that is the case using some tool to assert that the incoming data type and format is the same as what is expected and only allow data to be sent if that is the case would solve this.

## Decision

The project will use the assert package installed via npm for making assertions in the `Validators.js` file.

## Consequences

The assertion tool will throw errors if the received data is of an unexpected type, value, or format. These errors can then be handled to provide appropriate messages to the user.

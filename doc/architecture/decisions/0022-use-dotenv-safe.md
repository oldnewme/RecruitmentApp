# 22. Use dotenv-safe

Date: 2021-02-21

## Status

Accepted

## Context

dotenv-safe ensures that all the defined environment variables are defined correctly both in the .env file and .env.example, otherwise an error is thrown.

## Decision

The project will use dotenv-safe

## Consequences
Using dotenv-safe ensures that all the necessary environment variables have been defined correctly.

# 18. Use npm for project/package management

Date: 2021-02-01

## Status

Accepted

## Context

Package managers are an essential part of developing a modern web application.
They provide developers with an easy way to install different tools and frameworks to improve ease of development by allowing the developers to use solutions to problems that have already been solved, rather than "reinventing the wheel".
A CLI should also be available to allow for running development versions of the project or tests from a single interface.

## Decision

We have decided to use `npm` for managing our project and packages. 

## Consequences

`npm` is one of the most popular package managers for JavaScript developers, and offers an easy to use CLI for installing necessary packages, building the project, and providing a way to run tests using an installed test framework such as Jest.
Yarn is another package manager that we could have chosen that offers some performance and security improvements, but the group's familiarity with `npm` lead us to go with that instead of `yarn`.

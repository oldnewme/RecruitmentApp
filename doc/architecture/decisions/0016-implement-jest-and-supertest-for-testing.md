# 16. Implement Jest and Supertest for testing

Date: 2021-03-01

## Status

Accepted

## Context

Automated unit testing is a great way to check whether or not classes and methods behave as expected. 
Unit testing allows for simplified troubleshooting by testing of each component, should they fail, rather than doing test runs on the entire system.
Since we are also developing an express API that should handle HTTP requests, we need to be able to create such requests in our testing environment.

## Decision

We have decided to use Jest for unit testing, and the Supertest library for programmatically sending HTTP requests we want to test.

## Consequences

Jest is a popular test framework developed by Facebook that has a lot of support and documentation, and an intuitive syntax, which will reduce the risk of a slow development process due to inexperience with its implementation.
On the Jest website, it is also explicitly stated that it works with Node.js projects, which is what we are using for our backend.
Supertest is a very popular library that works with any test framework, and offers the ability to programmatically send HTTP requests and handle HTTP responses, which is very useful for unit testing our API. 
Without supertest, API tests would have to be done manually using an API testing application such as Postman or Insomnia.
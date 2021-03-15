# 17. Use JSDoc for source code annontations

Date: 2021-03-01

## Status

Accepted

## Context

To improve code readability and restrict how many more features are to be included in a single class or method, proper documentation is necessary.
Without documentation for classes and functions, it can become a daunting task to figure out what some of them do, and what it's parameters and returned values are supposed to be.
A common format for all documentation also improves code readability and understanding for new developers.

## Decision

We have decided to include JSDoc for all public classes and functions in our project that we have written.

## Consequences

JSDoc has many simmilarities with JavaDoc, which is a documentation format used for Java. 
The group's previous experience in writing documentation with JavaDoc helped make the decision to use JSDoc.
Tags used in JSDoc comments are very similar to those used in JavaDoc and provide the possibility to write clear explanations for the class' or function's parameters, return value, errors thrown, etc.
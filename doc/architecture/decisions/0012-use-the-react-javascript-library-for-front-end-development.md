# 12. Use The React JavaScript Library For Front End Development

Date: 2021-02-03

## Status

Accepted

## Context

Our web application will need a front end solution to interact with applicants and recruiters. There are several popular libraries and frameworks to make this possible. ReactJS is an easy to use library that makes it possible to build a single page application using components. 

## Decision

We will use ReactJS and client side rendering to develop the front end of our application.

## Consequences

Having the same programming language on our front end as well as backend will make it easier to develop our product since there will be no need to switch between programming languages. Since most often small changes to the page will be made when using the application, we will use client side rendering to avoid resending the same information from the server repeatedly.

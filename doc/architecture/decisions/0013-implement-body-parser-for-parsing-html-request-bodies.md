# 13. Implement body-parser for parsing HTML request bodies

Date: 2021-02-13

## Status

Accepted

## Context

When developing an API that can receive and handle HTTP requests, we need a way to parse the body of each request using a specific type. In our case, we need middleware that can parse `json`. 

## Decision

We will use `body-parser` for our middleware that handles requests containing `json`. 

## Consequences

Together with `express`, we can now introduce a middleware in our server file with just two lines of code. 
After that, we can then be sure that any incoming HTTP requests that can be handled will have a body containing `json` formatted data.

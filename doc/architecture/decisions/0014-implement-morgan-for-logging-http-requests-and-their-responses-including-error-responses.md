# 14. Implement morgan for logging HTTP requests and their responses, including error responses

Date: 2021-03-01

## Status

Accepted

## Context

We need a way to log different things that may happen when running our project, including HTTP requests received and their responses.
It would be very good if we can find a well used and documented tool that can do this for us rather than creating a logger class from scratch. 

## Decision

We will use `morgan` for generating logs for HTTP requests and responses that have been handled by the server.

## Consequences

The use of a well used and documented tool for logging will allow us to worry less about how to implement the logging, and focus more on what information we want to log and how it is logged.

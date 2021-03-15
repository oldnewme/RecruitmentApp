# 21. Implement Formik for client side data validation

Date: 2021-01-28

## Status

Accepted

## Context

Formik is used to validate the user entered data in the input forms on the frontend. If something is wrong with the data a message is displayed and nothing is sent to the server.

## Decision

The project will use Formik.

## Consequences

Client side validation makes our application more responsive since a clients input data can get validated instantly on the website instead of having to wait for the server to validate it an response. Observe that we still validate the data on the server.
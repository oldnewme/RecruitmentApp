# 10. Use Github actions for ci/cd

Date: 2021-03-08

## Status

Accepted

## Context

A CI/CD pipeline that is used for testing, static analysing, delivery and sometimes deployment. Will speed up development and simplify integration of code between developers. Several cloud providers can deliver this functionality. GitHub Actions is an option for this and also gives the option to use plugins for static analysis as well.

## Decision

Use GitHub Actions for continuous integration and continous delivery with codacy for static analyzing of code.

## Consequences

Integrating and delivering robust working code will be easier with the use GitHub Actions. As the remote repository is on GitHub it is a great advantage not needing another tool or website for this functionality. The product is easier to use than many alternatives and suits a small project like ours well.

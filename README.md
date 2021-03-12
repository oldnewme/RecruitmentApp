# RecruitmentApp
This is the backend for the project in the course IV1201 Architecture and Design of Global Applications. Its frontend source code can be found [here](https://github.com/Homamjabir/Architecture-and-Design). 

## What do I need to build and run this project locally?
### Prerequisites
To build and run this locally, you need to have a relational database service such as MySQL or PostgreSQL, and Node.js
### Configuration
To configure the backend before building and running, make sure to create a `.env` file based on `.env.example` to configure all necessary environment variables.
### Build and Run
Once you have navigated to the project directory, you can run `npm start` to run a production server or `npm run dev` to run a development server for testing the API using an app like Postman. If you encounter errors caused by missing dependencies and packages, try running `npm install` in the project directory to install all required dependencies. If you want to run tests, run `npm test` to start Jest.

## A note on the CI workflow in Github Actions
If you are planning on using Github Actions for your workflow, make sure that there is no --watchAll flag or similar flags that stop the test from finishing execution. This is done by checking if there is a flag for the Jest scripts in `package.json`.
## How and where is this project deployed?
This project is deployed using Heroku, which can also provide a PostgreSQL database (make sure you configure your DB_DIALECT environment variable to be set to PostgreSQL if you do not use it locally). The URL for this project is https://recruitmebackend.herokuapp.com for the backend and the frontend is hosted on https://recruitmefrontend.herokuapp.com

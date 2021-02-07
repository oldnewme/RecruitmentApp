const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express');
const app = express();
const morgan = require('morgan');

const result = require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env.example')
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(process.env.SERVER_PORT,
  process.env.SERVER_HOST, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
})
// logging 
app.use(morgan('combined'));
//  Applicant API Routes
// app.use('/api/applicant', require('./src/api/ApplicantAPI'));

//  Applicant API Class Routes
// app.use('/api/applicantclass', require('./src/api/ApplicantAPIClass'));


// so u can use class
const reqHandlerLoader = require('./src/api');
reqHandlerLoader.loadHandlers(app);

// 404 errors
app.use((req, res, next) =>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// other errors
app.use((error, req, res, next) =>{ 
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
});
module.exports = server;

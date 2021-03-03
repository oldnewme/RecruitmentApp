const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())

// logging
const morgan = require('morgan');

require('dotenv-safe').config({allowEmptyValues: true,
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env.example')
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const cookieParser = require('cookie-parser');

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(/*process.env.SERVER_PORT,
  process.env.SERVER_HOST*/process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
// logging
app.use(morgan('combined'));

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

const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express');
const app = express();
const reqHandlerLoader = require('./src/api');
var cors = require('cors');
app.use(cors());

//for logging
const morgan = require('morgan');
const fs = require('fs');

require('dotenv-safe').config({allowEmptyValues: true,
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env.example')
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// logging, we can use morgan tokens to specify exactly what to log
app.use(morgan('\nMorgan logged:\nmethod: :method \nin: :url \ncontent length: :res[content-length] \nresponse time: :response-time ms \nstatus: :status\n'));
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

// so u can use class
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


const server = app.listen(/*process.env.SERVER_PORT,
  process.env.SERVER_HOST*/process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

module.exports = server;

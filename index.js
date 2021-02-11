const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express');
const app = express();
const morgan = require('morgan');
const authorization = require(path.join(APP_ROOT_DIR, 'src/api/auth/Authorization'));

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

app.get('/locked', authorization.authenticateToken, (req, res) => {
  console.log('test')
  res.json({message:'it worked'});
})

app.post('/login', (req, res) => {
  //Authenticate user
  const user = { name: req.body.username };
  accessToken = authorization.getToken(user);
  res.json({accessToken:accessToken});
})


const server = app.listen(process.env.SERVER_PORT,
  process.env.SERVER_HOST, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
})
// logging 
app.use(morgan('combined'));

// so u can use class
const reqHandlerLoader = require('./src/api');
const Authorization = require('./src/api/auth/Authorization');
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

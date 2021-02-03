const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express')
const app = express()

//console.log(APP_ROOT_DIR)

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

module.exports = server;

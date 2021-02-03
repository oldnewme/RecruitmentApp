const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');
/*
const result = require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
});
*/
const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// från exempel
const reqHandler = require('./api');
reqHandlerLoader.loadHandlers(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = server;
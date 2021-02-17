const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '.');
const express = require('express');
const app = express();

// logging
const morgan = require('morgan');
/**
 * Authorization start
 */
const bodyParser = require('body-parser');
const Applicant = require('./src/model/Applicant');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

// to extract token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// put in .env
jwtOptions.secretOrKey = 'secret';

// create some helper functions to work on the database
  const getAllApplicants = async () => {
    return await Applicant.findAll();
  };
  const getApplicant = async obj => {
    return await Applicant.findOne({
    where: obj,
  });
  };

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let applicant = getApplicant({ username: jwt_payload.username });
    if (applicant) {
      next(null, applicant);
    } else {
      next(null, false);
    }
  });

  // use the strategy
passport.use(strategy);

  app.use(passport.initialize());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // login route
app.post('/login', async function(req, res, next) { 
  console.log(req.body.username)
  const { username, password } = req.body;
  if (username && password) {
    // we get the user with the name and save the resolved promise
    //returned
    let applicant = await getApplicant({ username });
    if (!applicant) {
      res.status(401).json({ msg: 'No such user found', applicant });
    }
   if (applicant.password === password) {
      // from now on we’ll identify the user by the id and the id is
// the only personalized value that goes into our token
      let payload = { username: applicant.username };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});

// protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json('Success! You can now see this without a token.');
});
/**
 * Authorization end
 */
require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env.example')
});

//const bodyParser = require('body-parser');
//app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
//app.use(bodyParser.json());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post('/login', (req, res) => {
//   const user = { name: req.body.username };
//   accessToken = authorization.getToken(user);
//   res.json({accessToken:accessToken});
// })


const server = app.listen(process.env.SERVER_PORT,
  process.env.SERVER_HOST, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
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

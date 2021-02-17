const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Applicant = require('../model/Applicant');

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
    let applicant = getApplicant({ id: jwt_payload.id });
    if (applicant) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);

// class Authorization {

//     static getToken(user) {
//         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//         this.user = user;
//         return accessToken;
//     }

//     static authenticateToken(req, res, next) {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' '[1]);
//         console.log(token)
//         if (token == null) return res.sendStatus(401);
        
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             console.log(req.headers)
//             console.log(this.user);
//             if (err) return res.sendStatus(403);
//             req.user = this.user;
//             next();
//         });
//     }
// }
module.exports = Authorization;
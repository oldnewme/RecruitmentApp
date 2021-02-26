const jwt = require('jsonwebtoken');

class Authorization {
    /**
     * 
     * @param {Request} req The express Request object
     * @param {Response} res The express Rsponse object
     * @param {Next} next The express call to the next request
     */
    static authenticateToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token =authHeader && authHeader.split(' ')[1];
        if(token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        })
    }

    /**
     * 
     * @param {Applicant} user The applicant for which to generate an accessToken
     */
    static generateAccessToken(user){
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'});
    }
    
    /**
     * 
     * @param {Applicant} user The applicant for which to generate the refreshToken
     */
    static generateRefreshToken(user){
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    }

}

module.exports = Authorization;
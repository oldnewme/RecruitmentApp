const jwt = require('jsonwebtoken');

class Authorization {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
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
     * @param {*} user 
     */
    static generateAccessToken(user){
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'})
    }
    
    /**
     * 
     * @param {*} user 
     */
    static generateRefreshToken(user){
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    }

}






//const user = {username:req.body.username}
//const accessToken = generateAccessToken(user);
// const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);



// module.exports = {
//     authenticateToken,
//     generateAccessToken,
//     generateRefreshToken
//  }
module.exports = Authorization;
const jwt = require('jsonwebtoken');
const controller = require('../../controller/Controller');

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
            console.log("user: "+user)
            req.user = user;
            next();
        })
    }

    static getUserInfo(token) {
        var atob = require('atob');
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
      }

    static authenticateRole(roleId){    
        return async (req, res, next) => {
            const person = await controller.getPerson(req.user.username);
            const personRole = await person.getRole();
            if(personRole.id !== roleId){
                res.status(401);
                console.log("input roleId: " + personRole.id);
                return res.send('You do not have permission to see this page');
            }
            next();
    }    
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
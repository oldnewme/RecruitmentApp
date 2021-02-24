const jwt = require('jsonwebtoken');

class Authorization {

    static getToken(user) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        this.user = user;
        return accessToken;
    }

    static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' '[1]);
        console.log(token)
        if (token == null) return res.sendStatus(401);
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(req.headers)
            console.log(this.user);
            if (err) return res.sendStatus(403);
            req.user = this.user;
            next();
        });
    }
}
module.exports = Authorization;
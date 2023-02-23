const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.Authorization = async (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(404).json({
            msg: "Login first"
        });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            return response.status(403).json({ msg: 'invalid token' })
        }

        req.user = user;
        next();
    });
    
    
    
}
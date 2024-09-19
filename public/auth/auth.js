const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Auth is a function to VERIFY if the token that the server is getting is the right token. 
function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, jwtSecret);

    if (response) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = { auth };
const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET;

// Auth is a function to VERIFY if the token that the server is getting is the right token. 
function auth(req, res, next) {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const bearerToken = token.split(' ')[1]; 
    
    jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate token" });
        }
        
        req.body.userId = decoded.username; 
        next(); 
    });
}

module.exports = { auth };
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { UserModel } = require('../public/db/db')
const jwt = require('jsonwebtoken')
const {apiRouter} = require('./api')


const app = express();
const dbConnect = process.env.DB_CONNECT;
const JWT_SECRET = process.env.JWT_SECRET; 
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter)
mongoose.connect(dbConnect)





app.post('/signup', async (req, res) => {
    console.log("New user signup!");
    const name = req.body.name;
    const password = req.body.password;
    
    try {
        const hash = await bcrypt.hash(password, 5); 

        await UserModel.create({
            name: name,
            password: hash
        });

        res.status(200).json({
            message: "<h3>You are signed up, please continue to the login page</h3>"
        });
    } catch (e) {
        if(e.code === 11000){
            return res.status(400).json({
                message: "Username taken, please try a different one."
            })
        }
        console.error('Error during signup:', e); 
        res.status(500).json({
            message: "Error signing up"
        });
    }
});

app.post('/login', async (req, res) => {
    console.log("User Login!");
    const name = req.body.name;
    const password = req.body.password;

    try {
        const response = await UserModel.findOne({ name: name });
        
        if (!response) {
            return res.status(403).json({
                message: "User doesn't exist, please sign up"
            });
        }
        
        const passwordMatch = await bcrypt.compare(password, response.password);
        if (passwordMatch) {
            const token = jwt.sign({
                userId: response._id.toString(),
                username: response.name 
            }, JWT_SECRET); 

            return res.json({
                token
            });
        } else {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch (e) {
        console.error('Error during login:', e); 
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
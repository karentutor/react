const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validators = require('../util/validators');
const path = require('path');
import * as db from '../util/fileHandler';


// this is a depedency of the login function -- createJWT
// here we authenticate the data -- called in create JWT 
const authenticate = async (res, validEmail, email, name, validPassHashed, password) => {
    try {
        // See if password matches db password( here in example validPassHashed above)
        const passValid = await bcrypt.compare(password, validPassHashed);

        //If email and pass match
        if ((email.toString() === validEmail) && (passValid)) {

            const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return res.json({ token });
        }
    } catch (error) {
        console.log(error);
    }
    // Else fail
    return res.status(400).json({ message: "incorrect credentials provided" });
};


// This is a login function
// Generates JWT Token
// May choose required inputs -- here email and pass -- suggest change to id / username / pass for production
exports.createJWT = (req, res, next) => {

    //required login fields
    const email = req.body.email;
    const password = req.body.password;

    let errMsg = [];

    // Is present data
    const requiredFields = ["email", "password"];
    const notPresentData = validators.isPresentData(requiredFields, req.body);
    if (notPresentData) {
        errMsg = [...notPresentData];
    }

    if (!validators.isEmail(email)) errMsg.push("email - not a valid email");

    // If !all required data present -- return error 
    if (errMsg.length > 0) return res.status(401).json({ message: errMsg });

    (async () => {
        try {
            // where getting data from
            const fromFile = path.join(__dirname, '..', 'data', 'users.json');
            //get a list of users from the db / file
            const users = await db.getAll(fromFile);
            if (users) {

                //look for the user by email (required unique)
                let user = users.find(o => o.email === email);

                //if can't find user -- not registered or email not correct, please register
                if (typeof user == 'undefined') return res.status(401).json({ message: "incorrect credentials provided" });

                // continue if user found and try to authenticate
                const validEmail = user.email;
                const name = user.name;
                const validPassHashed = user.hash;
                authenticate(res, validEmail, email, name, validPassHashed, password);
            } else {
                //if no users found
                return res.status(500).json('sorry, there has been a glitch');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json('sorry, there has been a glitch');
        }
    })();
};


// TEST JWT Token
//Returns three error msgs on false -- expired, incorrect and not present token --- remove or simplify upon production to perhaps just 'not authorized'
//Continues on if true
//test
exports.requireSignin = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

            if (err) {
                //use this err for production
                //return res.status(403).send({ message: 'token not provided' });

                //specific error message --- comment out for production
                if (err.message == 'jwt expired') return res.status(403).send({ message: 'token expired' });
                if (err.message == 'invalid token') return res.status(403).send({ message: 'token not provided' });
                if (err.message = 'jwt must be provided') return res.status(403).send({ message: 'token not provided' });

            }
            next();
        });
    } else {
        return res.status(403).send({ message: 'token not provided' });
    }
};
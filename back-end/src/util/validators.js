
//import * as db from 'fileHandler';
const db = require('./fileHandler');
const bcrypt = require('bcrypt');
const rounds = 10;


isEmail = (email) => {
    {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
};

isValidEmail = (errMsg, email) => {
    if (typeof string === 'undefined') return false;
    let isValidEmail = isEmail(email);
    if (!isValidEmail) return false;
};

isLength = (val, length) => val.length > length;

isValidLength = (string, length) => {
    if (typeof string === 'undefined') return false;
    let isValidString = isLength(string, length);
    //console.log(isValidString);
    if (!isValidString) return false;
    else return true;

};

isPresentData = (arr, req) => {

    let message = [];

    arr.forEach((data) => {
        if (!(data in req)) {
            message.push(`${data}`);
        }
    });

    if (message.length) return message;
};

/*
isUniqueEmail = async (file, email) => {
    try {
        let content = await db.getAll(file);
        let result = await content.find(user => user.email === email)) ;
        console.log(result.email);

    }
    catch (err) {
        console.log(err);
    }
};
*/
// for specific error message to implmenet in future version
//const emailErrMsg = "'email' Not of type email.  Please try again";
//const passErrMsg = "'password' Minimum of 8 characters please.";

module.exports = { isEmail, isLength, isPresentData, isValidEmail, isValidLength };



import { v4 as uuidv4 } from 'uuid';
import * as db from '../util/fileHandler';
const validators = require('../util/validators');
const bcrypt = require('bcrypt');

/* to refactor */
//import { promises as fs } from 'fs';
import path from 'path';

exports.createUser = (req, res, next) => {

    const { name, password, email } = req.body;
    const rounds = 10; // for hasing below
    const id = uuidv4();
    const file = path.join(__dirname, '..', 'data', 'users.json');

    let errMsg = [];

    // Is present data
    const requiredFields = ["name", "password", "email"];
    const notPresentData = validators.isPresentData(requiredFields, req.body);
    if (notPresentData) {
        errMsg = [...notPresentData];
    }

    // Is valid data
    // rework to have a separate message for email error vs not present data
    if (!validators.isEmail(email)) errMsg.push("email");
    // rework to have a separate message for password length error 
    if (!validators.isValidLength(password, 7)) errMsg.push("password");


    (async () => {

        try {
            //Is valid user -- unique email
            let userFound = await db.findOne(file, 'email', email);
            if (typeof userFound != 'undefined') errMsg.push('not a unique email, please try again');

            //if errors - terminate execution
            if (errMsg.length > 0) return res.status(400).json({ message: "validation error", invalid: errMsg });

            // Begin the saving of user process
            const hash = await bcrypt.hash(password, rounds);
            const addData = ({ id, name, email, hash });

            await db.add(addData, file);
            res.status(200).json({ id, name, email });

        }
        catch (err) {
            console.log(err);
            res.status(500).json('sorry, there has been a glitch');
        }
    })();
};
import { v4 as uuidv4 } from 'uuid';
//const db = require('../util/dbHandler');
import * as db from '../util/fileHandler';
import * as validators from '../util/validators';
import path from 'path';
//import * as db from './dbHandler';
//const validators = require('../util/validators');

exports.createEntry = (req, res, next) => {

    const { name, email, phoneNumber, content } = req.body;
    const id = uuidv4();

    let errMessage = [];

    // Is present data
    const requiredFields = ["name", "email", "phoneNumber", "content"];
    const notPresentData = validators.isPresentData(requiredFields, req.body);
    if (notPresentData) errMessage = [...notPresentData];

    //Is valid data
    // Rework to have a separate message for email error type
    if (!validators.isEmail(email)) errMessage.push("email");

    //If an error
    if (errMessage.length > 0) {
        //bad request
        return res.status(400).json({ message: "validation error", invalid: errMessage });
    } else {
        //return res.status(200).json({ id, name, email, phoneNumber, content });
        (async () => {
            try {
                // hash is for db
                // add to the file if not exist
                const addData = ({ id, name, email, phoneNumber, content });
                const toFile = path.join(__dirname, '..', 'data', 'entries.json');
                db.add(addData, toFile);
                res.status(200).json({ id, name, email, phoneNumber, content });

            }
            catch (err) {
                console.log(err);
                res.status(500).json('sorry, there has been a glitch');
            }
        })();
    }

};

exports.getEntry = async (req, res, next) => {

    const fromFile = path.join(__dirname, '..', 'data', 'entries.json');

    const id = req.params.id.trim().toString();

    try {
        const entries = await db.findOne(fromFile, 'id', id);
        if (typeof entries != 'undefined') return res.status(200).send(entries);
        else return res.status(404).send({ message: `entry ${id} not found` });
    } catch (err) {
        console.error("route error", err);
        return next(err);
    };
};

exports.getEntries = async (req, res, next) => {

    const fromFile = path.join(__dirname, '..', 'data', 'entries.json');

    try {
        const entries = await db.getAll(fromFile);
        if (typeof entries != 'undefined') return res.send(entries);
        else return res.send('sorry we do not yet have any entries');
    } catch (err) {
        console.error("route error", err);
        return next(err);
    };
};
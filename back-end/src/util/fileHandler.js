import fs from 'fs';
import { NotFoundError } from './errors.js';


//private function - Returns a bool file read and writeable permis flags passed
async function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.R_OK | fs.constants.W_OK)
        .then(() => true)
        .catch(() => false);
}


// private function for the module - writing
const write = async (data, file) => {
    await fs.promises.writeFile(file, JSON.stringify(data));
};

const add = async (data, file) => {
    try {
        let content = await getAll(file);
        if (typeof content === 'undefined') content = [];
        content.push(data);
        await write(content, file);
        console.log("file written");
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findOne = async (file, key, value) => {
    try {
        if (!(await checkFileExists(file))) await fs.promises.writeFile(file, '');
        const content = await fs.promises.readFile(file);
        if (Object.keys(content).length != 0) {
            let data = JSON.parse(content);
            const result = data.find(user => user[key] === value);
            if (result) return result;
        }
    } catch (err) {
        console.log(err);
    }
};


const getAll = async (file) => {
    try {
        if (!(await checkFileExists(file))) await fs.promises.writeFile(file, '');
        const content = await fs.promises.readFile(file);
        if (Object.keys(content).length != 0) return JSON.parse(content);
    } catch (err) {
        console.log(err);
    }
};



const update = async (id, data, file) => {
    let content = await getAll(file);
    if (!isArray(content)) {
        throw new Error("No data found");
    }

    const itemLocation = content.findIndex(item => item.id === id);
    if (itemLocation != -1) {
        content[itemLocation] = data;
    } else {
        throw new NotFoundError(`ID: ${id} not found`);
    }
    // let's write it back to the file now
    await write(content);
};


export {
    add,
    findOne,
    getAll,
    update
};
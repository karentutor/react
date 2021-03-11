const express = require('express');
var cors = require('cors');

const app = express();

console.log('here');

app.use(cors());

app.use(express.json());

//Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
// //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Headers', '*');


//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

const PORT = process.env.PORT || 3100;

const authRoutes = require('./src/routes/auth');
const entryRoutes = require('./src/routes/entries');
const userRoutes = require('./src/routes/users');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(authRoutes);
app.use(entryRoutes);
app.use(userRoutes);

//Route not found must be last request
app.use(function (req, res, next) {
    res.status(404).send({ message: "not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    return res.status(500).send({ error: "Unexpected error found" });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

const express = require('express');
const userController = require('../controllers/users');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();


router.post('/users', userController.createUser);


module.exports = router;

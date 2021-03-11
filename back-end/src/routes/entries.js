const express = require('express');
const entryController = require('../controllers/entries');
const { requireSignin } = require("../controllers/auth");
const router = express.Router();

router.post('/contact_form/entries', entryController.createEntry);

// these routes requrie signin
router.get('/contact_form/entries/:id', requireSignin, entryController.getEntry);
//router.get('/contact_form/entries', requireSignin, entryController.getEntries);
router.get('/contact_form/entries', requireSignin, entryController.getEntries);

module.exports = router;

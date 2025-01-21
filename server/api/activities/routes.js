const express = require('express');
const router = express.Router(); 
const { createActivity, joinActivity } = require('./controller');

router.post('/', createActivity);
router.get('/join/:accessCode', joinActivity);

module.exports = router;

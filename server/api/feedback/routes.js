const express = require('express');
const router = express.Router();
const { createFeedback } = require('./controller'); 
const { getFeedbackForActivity } = require('./controller');

router.post('/', createFeedback);
router.get('/:activityId', getFeedbackForActivity);

module.exports = router;

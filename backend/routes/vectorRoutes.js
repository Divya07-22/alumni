const express = require('express');
const router = express.Router();
const { matchProfiles } = require('../controllers/vectorController');

// Route for profile matching, accessed by a POST request
router.post('/match', matchProfiles);

module.exports = router;

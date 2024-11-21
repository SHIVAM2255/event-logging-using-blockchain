// routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController'); // Ensure correct import

const router = express.Router();

// Define your routes
router.post('/events', createEvent);
router.get('/events', getEvents);

module.exports = router;  // Ensure router is being exported correctly

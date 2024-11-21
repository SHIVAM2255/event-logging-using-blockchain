// controllers/eventController.js

const Event = require('../models/eventModel');
const { generateHash } = require('../utils/hashUtils');

// Create a new event
const createEvent = async (req, res, next) => {
  try {
    const { eventType, sourceAppId, dataPayload } = req.body;

    const lastEvent = await Event.findOne().sort({ _id: -1 });
    const prevHash = lastEvent ? lastEvent.hash : 'GENESIS';

    const hash = generateHash({ eventType, sourceAppId, dataPayload, prevHash });

    const newEvent = await Event.create({ eventType, sourceAppId, dataPayload, hash, prevHash });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

// Query events
const getEvents = async (req, res, next) => {
  try {
    const { startDate, endDate, eventType, sourceAppId } = req.query;

    const filters = {};
    if (startDate && endDate) filters.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (eventType) filters.eventType = eventType;
    if (sourceAppId) filters.sourceAppId = sourceAppId;

    const events = await Event.find(filters).sort({ timestamp: -1 });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvent, getEvents }; // Ensure proper export

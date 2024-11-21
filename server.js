// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes'); // Ensure correct import of eventRoutes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // Middleware to parse incoming JSON requests

// Use eventRoutes for '/api' paths
app.use('/api', eventRoutes);  // This should be a valid middleware function

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

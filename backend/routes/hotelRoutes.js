const express = require('express');
const hotels = express.Router();
const pool = require('../db/db');
const { hotel } = require('../controllers/hotels');
hotels.get('/hotels', hotel);
module.exports = hotels;
// Compare this snippet from backend/index.js:
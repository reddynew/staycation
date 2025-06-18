const express = require('express');
const cors = require('cors');
const pool = require('../db/db');
const parks = express.Router();
const{park}=require('../controllers/parks')
parks.get('/parks', park)
module.exports = parks;

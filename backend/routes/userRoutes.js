const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const {user, login,register, logout}=require('../controllers/users')
router.get('/users', user)
router.get('/login',login)
router.get('/register',register)
router.get('/logout',logout)
module.exports = router;
// Compare this snippet from backend/db/db.js:  

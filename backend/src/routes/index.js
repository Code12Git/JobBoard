const express = require('express');
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');

const router = express.Router();

router.use('/api/auth', authRoutes);  
router.use('/api/jobs', jobRoutes);  
module.exports = router;
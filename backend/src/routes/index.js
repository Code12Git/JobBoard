const express = require('express');
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const userRoutes = require('./userRoutes');
const applyRoutes = require('./applyRoutes');
const router = express.Router();

router.use('/api/auth', authRoutes);  
router.use('/api/jobs', jobRoutes);  
router.use('/api/users',userRoutes)
router.use('/api/apply', applyRoutes);
module.exports = router;
const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/', signupRoutes);

module.exports = router;
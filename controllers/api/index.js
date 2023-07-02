const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const signupRoutes = require('../signupRoutes');
const loginRoutes = require('../loginRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes)

module.exports = router;
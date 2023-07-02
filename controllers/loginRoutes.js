const router = require('express').Router();

// Render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
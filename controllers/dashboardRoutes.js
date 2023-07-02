const router = require('express').Router();

// Render the dashboard page
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});



module.exports = router;
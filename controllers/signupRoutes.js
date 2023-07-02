
const router = require('express').Router();
const { User } = require('../models'); // Assuming you have a User model

// Render the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle the signup form submission
router.post('/signup', async (req, res) => {
  try {
    // Retrieve the necessary data from the request body
    const { username, password } = req.body;

    // Create a new user in the database
    const newUser = await User.create({ username, password });
    
    // Automatically log the user in after signup
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    }); 

    // Redirect to the dashboard or any other desired page
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

module.exports = router;
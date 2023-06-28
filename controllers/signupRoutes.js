const express = require('express');
const router = require('express').Router();
const { User } = require('../models'); // Assuming you have a User model

// Render the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle the signup form submission
router.post('/signup', async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { username, password } = req.body;

    // Create a new user in the database
    const newUser = await User.create({ username, password });

    // Redirect to the dashboard or any other desired page
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

module.exports = router;
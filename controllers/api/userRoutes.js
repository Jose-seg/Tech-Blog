const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// signup route
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login route
router.post('/login', async (req, res) => {
    try {

        console.log(req.body) 

        const userData = await User.findOne({ where: { username: req.body.username} });

        console.log(userData)

        if (!userData) {
            res.status(400).json({ message: "incorrect email or password" });
            return;
        }
        const validPassword = bcrypt.compareSync(req.body.password, userData.password);

        console.log(validPassword)
        
        if (!validPassword) {
            res.status(400).json({ message: "incorrect email or password" })
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
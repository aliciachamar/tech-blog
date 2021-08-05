const router = require('express').Router();
const { User } = require('../../models');

// get all customers route
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll().map(user => user.toJSON());
        // render to homepage
        res.status(200).render('homepage', { users });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
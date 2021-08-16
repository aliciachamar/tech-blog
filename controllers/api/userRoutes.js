const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/register', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.redirect("/dashboard");
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ 
          where: { 
              username: req.body.username 
            } 
      });
  
      if (!userData) {
        res.status(400).json({ message: 'Username or password is incorrect. Please try again.' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Username or password is incorrect. Please try again.' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.redirect("/dashboard");
      });

    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });
  
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
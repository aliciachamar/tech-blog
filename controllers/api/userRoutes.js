const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                userId: req.session.user_id
            }
        });
        const posts = userPosts.map(post => post.toJSON());
        res.status(200).render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.status(200).redirect("/dashboard");
    }

    res.status(200).render("login");
});

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.status(200).redirect("/dashboard");
    }

    res.status(200).render("register");
});

router.post('/register', async (req, res) => {
    try {
      const userData = await User.create({
          username: req.body.username,
          password: req.body.password
      });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
      });
      const allPosts = await Post.findAll({
        where: {
          userId: userData.id
        },
        include: [{
            model: Comment,
            include: [User]
        }, User]
        });
        const posts = allPosts.map(post => post.toJSON());
        res.status(200).render("dashboard", { posts });
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
      });
      const allPosts = await Post.findAll({
        include: [{
            model: Comment,
            include: [User]
        }, User]
        });
      const posts = allPosts.map(post => post.toJSON());
      res.status(200).render("homepage", { posts });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });
  
router.post('/logout', (req, res) => {
if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
} else {
    res.status(500).end();
}
});

module.exports = router;
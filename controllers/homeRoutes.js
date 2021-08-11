const router = require("express").Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [{
                model: Comment,
                include: [User]
            }, User]
        });
        const posts = allPosts.map(post => post.toJSON());
        res.status(200).render("homepage", { 
            posts,
            logged_in: req.session.logged_in })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
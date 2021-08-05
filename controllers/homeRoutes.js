const router = require("express").Router();
const { User, Post, Comment } = require('../models');

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: {
                model: Comment, User
            }
        });
        const posts = allPosts.map(post => post.toJSON());
        const allUsers = await User.findAll();
        const users = allUsers.map(user => user.toJSON());
        res.status(200).render("homepage", { posts, users })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
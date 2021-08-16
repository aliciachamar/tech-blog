const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/:id", async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            where: [{
                id: req.params.id
            }],
            include: [{
                model: Comment,
                include: [User]
            }, User]
        });
        const post = singlePost.toJSON();
        res.status(200).render("post", { 
            post,
            logged_in: req.session.logged_in,
            userId: req.session.user_id
            })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/update/:id", async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            where: [{
                id: req.params.id
            }],
            include: [{
                model: Comment,
                include: [User]
            }, User]
        });
        const post = singlePost.toJSON();
        res.status(200).render("updatePost", { 
            post,
            logged_in: req.session.logged_in });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            dateCreated: new Date(),
            userId: req.session.user_id,
        });
        console.log(newPost);
        res.redirect(`/dashboard`);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        console.log(updatedPost);
        res.status(200).json(updatedPost);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log(deletedPost);
        res.status(200).json(deletedPost);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
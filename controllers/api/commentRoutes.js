const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/:id", async (req, res) => {
    try {
        const user = await Comment.findByPk({
            where: {
                id: req.params.id
            }
        });
        console.log(user);
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.get("/update/:id", withAuth, async (req, res) => {
    try {
        const singleComment = await Comment.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            include: [User]
        });
        const comment = singleComment.toJSON();
        res.status(200).render("updateComment", { 
            comment,
            logged_in: req.session.logged_in });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        console.log(updatedComment);
        res.status(200).json(updatedComment);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.post("/:id", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.newComment,
            dateCreated: new Date(),
            userId: req.session.user_id,
            postId: req.params.id
        });
        res.redirect(`/api/posts/${req.params.id}`);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log(deletedComment);
        res.status(200).json(deletedComment);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
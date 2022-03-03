const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                include: [{ model: Comment }],
            });
        const posts = postData.map((post) => post.get({ plain: true }));
        // res.json(posts);
        res.render("homepage", { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render("login");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
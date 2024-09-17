const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Index Route
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});

// New Post Route
router.get('/posts/new', (req, res) => {
    res.render('new');
});

// Create Post Route
router.post('/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    });
    await post.save();
    res.redirect('/');
});

// Show Post Route
router.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('show', { post });
});

// Edit Post Route
router.get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});

// Update Post Route
router.put('/posts/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    });
    res.redirect(`/posts/${req.params.id}`);
});

// Delete Post Route
router.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

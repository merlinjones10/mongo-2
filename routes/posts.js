const express = require('express');
const { populate } = require('../models/Post');
const router = express.Router();
const Post = require('../models/Post');

// the middleware (app.use) in app.js sends us automaticalle to posts/, so / is actually /posts
//GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

// Get a specific post.
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

// DELETE a post.

router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
// SUBMIT A POST
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json(err);
  }
});
//UPDATE
router.patch('/:postId', async (req, res) => {
  try {
    const upatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// other version of post
// router.post('/', (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     description: req.body.description,
//   });
//   post
//     .save()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(200);
//     });
// });
// Async Awit version

module.exports = router;

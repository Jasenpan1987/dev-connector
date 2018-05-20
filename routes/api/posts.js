const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const router = express.Router();
const validatePostInput = require("../../validations/post");

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      return res.json(posts);
    })
    .catch(error => {
      errors.noPostsFound = "No posts found.";
      return res.status(500).json(errors);
    });
});

// @route GET api/posts/:post_id
// @desc Get one post based on post_id
// @access Public
router.get("/:post_id", (req, res) => {
  const errors = {};
  Post.findOne({ _id: req.params.post_id })
    .then(post => {
      if (!post) {
        errors.noPostFound = "Can not find this post";
        return res.status(404).json(errors);
      }
      return res.json(post);
    })
    .catch(error => {
      errors.noPostFound = "Can not find this post";
      return res.status(404).json(errors);
    });
});

// @route DELETE api/posts/:post_id
// @desc Delete one post based on post_id
// @access private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postId = req.params.post_id;
    const errors = {};

    Post.findOne({ _id: postId })
      .then(post => {
        if (!post) {
          errors.noPostFound = "Post does not exist";
          return res.status(404).json(errors);
        }

        if (post.user && post.user.toString() !== req.user.id) {
          errors.notAuthorized = "Cannot delete someone else's post.";
          return res.status(401).json(errors);
        }

        post
          .remove()
          .then(() => {
            return res.json({ success: true });
          })
          .catch(error => {
            errors.post = "Something went wrong";
            return res.status(500).json(errors);
          });
      })
      .catch(error => {
        errors.post = "Something went wrong";
        return res.status(500).json(errors);
      });
  }
);

// @route GET api/posts
// @desc Create posts
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      user,
      body,
      body: { text, name, avatar }
    } = req;

    const newPost = new Post({
      user: user.id,
      text,
      name,
      avatar
    });

    const { errors, isValid } = validatePostInput(body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    newPost.save().then(post => {
      return res.json(post);
    });
  }
);

// @route POST api/posts/like/:post_id
// @desc Add a like to post
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.noPostFound = "Post does not exist";
          return res.status(404).json(errors);
        }

        if (
          post.likes.find(like => like.user.toString() === req.user.id) !==
          undefined
        ) {
          errors.alreadyLiked = "You have already liked this post";
          return res.status(400).json(errors);
        }
        post.likes.push({ user: req.user.id });
        post
          .save()
          .then(post => {
            return res.send(post);
          })
          .catch(error => {
            errors.post = "Something went wrong";
            return res.status(500).json(errors);
          });
      })
      .catch(error => {
        errors.post = "Something went wrong";
        return res.status(500).json(errors);
      });
  }
);

// @route POST api/posts/unlike/:post_id
// @desc Remove a like to post
// @access Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          errors.noPostFound = "Post does not exist";
          return res.status(404).json(errors);
        }

        const targetIdx = post.likes.findIndex(
          like => like.user.toString() === req.user.id
        );
        if (targetIdx === -1) {
          errors.notLikedYet = "You havn't liked this post";
          return res.status(400).json(errors);
        }

        post.likes.splice(targetIdx, 1);
        post
          .save()
          .then(newPost => {
            return res.json(newPost);
          })
          .catch(error => {
            errors.post = "Something went wrong";
            return res.status(500).json(errors);
          });
      })
      .catch(error => {
        errors.post = "Something went wrong";
        return res.status(500).json(errors);
      });
  }
);

module.exports = router;

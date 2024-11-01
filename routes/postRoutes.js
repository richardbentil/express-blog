const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require("../controllers/postController");
const { createPost } = require("../controllers/postController");
const { validatePost } = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const verifyToken = require("../middlewares/jwtMiddleware");
const requireRole = require("../middlewares/roleMiddleware");

// GET request to retrieve all posts
router.get("/", getAllPosts);

// POST request to create a new post
router.post("/", authMiddleware, verifyToken, validatePost, createPost);

//GET request to retrieve 1 post
router.get("/:id", getPostById);

//PUT request to update a post
router.put("/:id", authMiddleware, verifyToken,  updatePostById);

//DELETE request to delete a post
router.delete("/:id", authMiddleware, verifyToken, requireRole("user"), deletePostById);

module.exports = router;

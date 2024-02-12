const express = require("express");
const router = express.Router()

const  { likePost  , unlikePost} = require("../controllers/likeController")
const { createComment} = require("../controllers/commentController");
const {createPost , getAllPosts, deletePost, updatePost} = require("../controllers/postController")


//mapping 

router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);

router.post("/likes/like", likePost)
router.post("/likes/unlike", unlikePost)

router.post("/comments/create", createComment);

router.delete("/posts/delete/:id", deletePost);
router.put("/posts/update/:id", updatePost);

module.exports = router;
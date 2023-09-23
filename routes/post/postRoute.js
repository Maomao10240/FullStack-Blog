const express = require("express");
const postRoute = express();
const {
  createPostCtrl,
  getPostsCtrl,
  getSinglePostCtrl,
  deletePost,
  updatePost,
} = require("../../controllers/post/post");

postRoute.post("/", createPostCtrl);
postRoute.get("/:id", getPostsCtrl);
postRoute.get("/:id", getSinglePostCtrl);

postRoute.delete("/:id", deletePost);
postRoute.put("/:id", updatePost);
module.exports = postRoute;

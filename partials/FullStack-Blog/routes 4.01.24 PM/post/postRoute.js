const express = require("express");
const postRoute = express();
const {
  createPostCtrl,
  getPostsCtrl,
  getSinglePostCtrl,
  deletePost,
  updatePost,
} = require("../../controllers/post/post");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");
const storage = require("../../config/cloudinary");

//instance of multer
const upload = multer({
  storage,
});

postRoute.post("/", isLogin, upload.single("file"), createPostCtrl);
postRoute.get("/", getPostsCtrl);
postRoute.get("/:id", getSinglePostCtrl);

postRoute.delete("/:id", isLogin, deletePost);
postRoute.put("/:id", isLogin, upload.single("file"), updatePost);
module.exports = postRoute;

const express = require("express");
const commentRoute = express();
const {
  createCommentCtrl,
  getSingleCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../../controllers/comment/comment");
commentRoute.post("/", createCommentCtrl);
commentRoute.get("/:id", getSingleCommentCtrl);
commentRoute.delete("/:id", deleteCommentCtrl);
commentRoute.put("/:id", updateCommentCtrl);
module.exports = commentRoute;

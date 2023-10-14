const User = require("../../models/user/User");
const Post = require("../../models/post/Post");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
  const { title, description, category, user } = req.body;
  try {
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }
    const userId = req.session.userAuth;
    //console.log(userId);
    const userFound = await User.findById(userId);
    //create a post
    const postCreated = await Post.create({
      title,
      description,
      category,
      user: userFound._id,
      image: req.file.path,
    });
    userFound.posts.push(postCreated._id);
    await userFound.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error);
  }
};
const getPostsCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const getSinglePostCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id);
    if (post.user.toString() != req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post", 403));
    }
    res.json({
      status: "success",
      user: "Post one deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
const updatePost = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post.user.toString() != req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to update this post", 403));
    }
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      image: req.file.path,
    });
    res.json({
      status: "success",
      user: "Post one update",
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createPostCtrl,
  getPostsCtrl,
  getSinglePostCtrl,
  deletePost,
  updatePost,
};

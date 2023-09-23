const createPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Create Post details",
    });
  } catch (error) {
    res.json(error);
  }
};
const getPostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Posts details",
    });
  } catch (error) {
    res.json(error);
  }
};

const getSinglePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post one details",
    });
  } catch (error) {
    res.json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post one deleted",
    });
  } catch (error) {
    res.json(error);
  }
};
const updatePost = async (req, res) => {
  try {
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

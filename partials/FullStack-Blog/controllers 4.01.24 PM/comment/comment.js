const createCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Comment created",
    });
  } catch (error) {
    res.json(error);
  }
};
const getSingleCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Comment one details",
    });
  } catch (error) {
    res.json(error);
  }
};

const deleteCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment one deleted",
    });
  } catch (error) {
    res.json(error);
  }
};
const updateCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Comment one update",
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createCommentCtrl,
  getSingleCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};

const express = require("express");
const userRoute = express();
const {
  registerCtrl,
  loginCtrl,
  profileCtrl,
  updateProfileCtrl,
  updatePasswordCtrl,
  userDetailCtrl,
  updateProfilePhotoCtrl,
  logoutCtrl,
} = require("../../controllers/user/users");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinary");
const multer = require("multer");
//client side
userRoute.get("/login", (req, res) => {
  res.render("users/login.ejs", { error: "" });
});
userRoute.get("/register", (req, res) => {
  res.render("users/register", { error: "" });
});
// userRoute.get("/profile-page", (req, res) => {
//   res.render("users/profile.ejs");
// });
userRoute.get("/profile-photo-upload", (req, res) => {
  res.render("users/uploadProfilePhoto.ejs", { error: "" });
});
userRoute.get("/update-user-form", (req, res) => {
  res.render("users/updateUser.ejs");
});
//server side
userRoute.post("/register", registerCtrl);

userRoute.post("/login", loginCtrl);
userRoute.get("/profile", isLogin, profileCtrl);
userRoute.put("/profile", isLogin, updateProfileCtrl);
userRoute.put("/update-password/:id", updatePasswordCtrl);
userRoute.get("/profile/:id", userDetailCtrl);
userRoute.get("/logout", logoutCtrl);

//instance of multer
const upload = multer({ storage });
userRoute.put(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  updateProfilePhotoCtrl
);

module.exports = userRoute;

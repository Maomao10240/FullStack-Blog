const User = require("../../models/user/User");
const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");

const registerCtrl = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  if (!email || !password || !fullName) {
    return res.render("users/register", {
      error: "All Fields are required",
    });
    //return next(appErr("All fields are needed"));
  }
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      //return next(appErr("User already Exist"));
      return res.render("users/register", {
        error: "Email exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    //redirect
    res.redirect("/api/users/profile");
  } catch (error) {
    res.json(error);
  }
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.session);
  if (!email || !password) {
    //return next(appErr("All fields are required."));
    return res.render("users/login", {
      error: "All Fields are required",
    });
  }
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      //return next(appErr("Invalid login"));
      return res.render("users/login", {
        error: "Invalid login",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      //return next(appErr("Invalid Login"));
      return res.render("users/login", {
        error: "Invalid login",
      });
    }
    req.session.userAuth = userFound;
    // console.log(req.session);
    // res.json({
    //   status: "success",
    //   user: "User login",
    // });
    res.redirect("/api/users/profile");
  } catch (error) {
    res.json(error);
  }
};

const logoutCtrl = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/api/users/login");
  });
};

const profileCtrl = async (req, res) => {
  //console.log("test");
  //res.render("users/profile.ejs");
  try {
    const userID = req.session.userAuth;
    const user = await User.findById(userID).populate("posts");
    // console.log(userID);
    // res.json({
    //   status: "success",
    //   data: user,
    // });
    res.render("users/profile", { user });
  } catch (error) {
    res.json(error);
  }
};

const updateProfileCtrl = async (req, res) => {
  const { fullName, email } = req.body;
  try {
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email taken", 400));
      }
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        email,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      user: "User profile update",
    });
  } catch (error) {
    res.json(next(appErr(error.message)));
  }
};

const updatePasswordCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(
        req.params.id,
        {
          password: hashPassword,
        },
        {
          new: true,
        }
      );
    }

    res.json({
      status: "success",
      user: "Update /User password",
    });
  } catch (error) {
    return next(appErr("Please provide password"));
  }
};

const userDetailCtrl = async (req, res) => {
  try {
    //get userId from params
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

const updateProfilePhotoCtrl = async (req, res) => {
  // console.log(req.file);
  if (!req.file) {
    return res.render("users/uploadProfilePhoto", {
      error: "Please upload image",
    });
  }

  try {
    //1. find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    if (!userFound) {
      //return next(appErr("User not found", 403));
      return res.render("users/uploadProfilePhoto", {
        error: "User not found",
      });
    }
    await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );
    // res.json({
    //   status: "success",
    //   data: "Image success",
    // });
    res.redirect("profile");
  } catch (error) {
    res.json(error);
    // return res.render("users/profile-photo-upload", {
    //   error: error.message,
    // });
  }
};
module.exports = {
  registerCtrl,
  loginCtrl,
  profileCtrl,
  updateProfileCtrl,
  updatePasswordCtrl,
  userDetailCtrl,
  updateProfilePhotoCtrl,
  logoutCtrl,
};

// this is for protecting the mongoose password and suer name
const globalErrHandler = require("./middlewares/globalHandler");
require("dotenv").config();
const express = require("express");
const app = express();
const userRoute = require("./routes/user/userRoute");
const postRoute = require("./routes/post/postRoute");
const commentRoute = require("./routes/comment/commentRoute");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/dbConnect");
const methodOverride = require("method-override");

//configure ejs
app.set("view engine", "ejs");
//serve static folder
app.use(express.static(__dirname, +"/public"));

//middlewares
app.use(express.json()); // pass incoming data
app.use(express.urlencoded({ extended: true })); //pass form data
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);
app.use((req, res, next) => {
  if (req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  } else {
    res.locals.userAuth = null;
  }
  next();
});
//routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api/users", userRoute);

//post routes
app.use("/api/posts", postRoute);

app.use("/api/comments", commentRoute);
app.use(globalErrHandler);
//error handler
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));

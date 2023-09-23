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

//middlewares
app.use(express.json()); // pass incoming data
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
//routes
app.use("/api/users", userRoute);

//post routes
app.use("/api/posts", postRoute);

app.use("/api/comments", commentRoute);
app.use(globalErrHandler);
//error handler
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));

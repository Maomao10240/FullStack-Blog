const mongoose = require("mongoose");
const dbConnect = async () => {
  //   console.log(process.env);
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    username: String,
    password: {
      type: String,
      required: true,
      unique: true, 
      index: true, 
    },
  },
  {
    collection: "UserInfo",
  }
);

const UserInfo = mongoose.model("UserInfo", userDetailsSchema);

async function insertUser(username, password) {
  if (!password) {
    throw new Error("Password is required");
  }

  const user = new UserInfo({
    username,
    password,
  });

  return user.save();
}
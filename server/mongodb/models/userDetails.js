import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true, 
      index: true, 
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  {
    collection: "UserInfo",
  }
);

userDetailsSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
  return token;
}

const UserInfo = mongoose.model("UserInfo", userDetailsSchema);

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
}

async function insertUser(username, password) {
  if (!password) {
    throw new Error("Password is required!");
  }

  const user = new UserInfo({
    username,
    password,
    isAdmin,
  });

  return user.save();
}

export default UserInfo;
export { validate, insertUser };
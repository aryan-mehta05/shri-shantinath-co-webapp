import express from "express";
import UserInfo from "../mongodb/models/userDetails.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      alert(error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await UserInfo.findOne({ username: req.body.username});
    if (!user) {
      alert("Invalid Email or Password");
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      alert("Invalid Email or Password");
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ status: "Ok", data: [token, user.isAdmin], message: "Logged in successfully!" });
    alert("Logged in Successfully");

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    alert("Internal Server Error");
  }
});

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export default router;
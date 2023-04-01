// ROUTE USED TO REGISTER NEW USER (SIGN UP)

import express from "express";
import bcrypt from "bcryptjs";
import UserInfo, { validate } from "../mongodb/models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await UserInfo.findOne({ username: req.body.username });
    if (user) {
      return res.status(409).send({ message: "User with given username already exists!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new UserInfo({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
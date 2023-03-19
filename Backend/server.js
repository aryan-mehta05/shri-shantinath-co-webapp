const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "yivbmSBvjwD-'[{\}.,ncsbjbkCWCMSJVNFDFVnvsj638//~"

app.use(cors());

app.use(express.json());

const mongoUrl =
  "mongodb+srv://Nishant7:Nishant7@userinfo.zmuhofi.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server started");
});

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/reg", async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10)
  try {
    const oldUser = await User.findOne({username})

    if (oldUser){
      return res.send({ error: "User exists" });
    }
    await User.create({
      username,
      password : encryptedPassword,
    });
    res.send({ status: "Ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error" });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  if (await bcrypt.compare(password, user.password)){
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)){
      return res.send({ status: "Ok" , data : token });
    }else{
      return res.send({ error: "Error" });
    }
  }
  res.json({ status: "Error" , error: "Invalid password" });
});
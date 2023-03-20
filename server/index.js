import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
// import regNewUserRoutes from "./routes/users.js";
import loginRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
// app.use("api/register", regNewUserRoutes);
app.use("/api/login", loginRoutes);

const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Shri Shantinath Co.',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server started on http://localhost:${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

// import "./mongodb/models/userDetails.js";

// const User = mongoose.model("UserInfo");

// app.post("/reg", async (req, res) => {
//   const { username, password } = req.body;
//   const encryptedPassword = await bcrypt.hash(password, 10)
//   try {
//     const oldUser = await User.findOne({username})

//     if (oldUser){
//       return res.send({ error: "User exists" });
//     }
//     await User.create({
//       username,
//       password : encryptedPassword,
//     });
//     res.send({ status: "Ok" });
//   } catch (error) {
//     console.log(error);
//     res.send({ status: "Error" });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user) {
//     return res.status(401).json({ error: 'User not found' });
//   }

//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({}, process.env.JWT_SECRET);

//     if (res.status(201)) {
//       return res.send({ status: "Ok" , data : token });
//     } else {
//       return res.send({ error: "Error" });
//     }
//   }
//   res.json({ status: "Error" , error: "Invalid password" });
// });
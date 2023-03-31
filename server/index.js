import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
// import regNewUserRoutes from "./routes/users.js";
import loginRoutes from "./mongodb/routes/auth.js";
import categoryRoutes from "./mongodb/routes/categoryRoutes.js";
import productRoutes from "./mongodb/routes/productRoutes.js";

dotenv.config();
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
// app.use("api/register", regNewUserRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Shri Shantinath Co.",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server started on http://localhost:${port} ...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

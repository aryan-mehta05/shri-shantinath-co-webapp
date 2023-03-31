import mongoose from "mongoose";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = (url) => {
  mongoose
    .connect(url, connectionParams)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));
};

export default connectDB;

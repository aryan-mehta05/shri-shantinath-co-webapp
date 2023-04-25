import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    colour: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },
    quantity: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length == 3 * this.colour;
        },
        message: function () {
          return `Quantity must contain ${3 * this.colour} elements`;
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);

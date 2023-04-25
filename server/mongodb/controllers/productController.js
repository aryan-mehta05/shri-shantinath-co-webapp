import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

const createProductController = async (req, res) => {
  try {
    const { name, description, category } = req.fields;
    const { photo } = req.files;
    const colour = parseInt(req.fields.colour);

    // Validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    if (isNaN(colour) || ![1, 2, 3, 4, 5, 6, 7, 8].includes(colour)) {
      return res
        .status(400)
        .json({ error: "Colour is required and should be a valid value" });
    }
    if (photo && photo.length > 0) {
      // check if there are any photos
      for (let i = 0; i < photo.length; i++) {
        if (photo[i].size > 1000000) {
          // check if each photo size is less than 1mb
          return res
            .status(400)
            .json({ error: "Photo is required and should be less than 1mb" });
        }
      }
    }

    const slug = slugify(name, { lower: true });

    // Create an array of field names based on the colour value
    const fields = [];
    for (let i = 1; i <= colour; i++) {
      fields.push(`A${i}`);
      fields.push(`B${i}`);
      fields.push(`C${i}`);
    }

    const quantity = fields.map((field) => {
      if (req.fields[field]) {
        return parseInt(req.fields[field]);
      }
      return 0;
    });

    const photos = [];
    if (photo && photo.length > 0) {
      // check if there are any photos
      for (let i = 0; i < photo.length; i++) {
        photos.push({
          data: fs.readFileSync(photo[i].path),
          contentType: photo[i].type,
        });
      }
    }

    const product = new productModel({
      name,
      slug,
      description,
      category,
      photo: photos,
      colour,
      quantity,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "A product with the same name already exists",
        message: "Error in creating product!",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in creating product!",
    });
  }
};

//get all products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all products!",
      error: error.message,
    });
  }
};
// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching single product!",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.length > 0) {
      const photo = product.photo[0];
      res.set("Content-type", photo.contentType);
      return res.status(200).send(photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo!",
      error,
    });
  }
};

// get all photo
const productAllPhotosController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    const photos = product.photo;
    if (photos.length > 0) {
      res.set("Content-type", "application/json");
      return res.status(200).send({ success: true, photos });
    } else {
      return res.status(404).send({
        success: false,
        message: "Product photos not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photos!",
      error,
    });
  }
};

//delete controller
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product!",
      error,
    });
  }
};

//upate products
const updateProductController = async (req, res) => {
  try {
    const { name, description, category } = req.fields;
    const { photo } = req.files;
    const colour = parseInt(req.fields.colour);

    // Validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    if (isNaN(colour) || ![1, 2, 3, 4, 5, 6, 7, 8].includes(colour)) {
      return res
        .status(400)
        .json({ error: "Colour is required and should be a valid value" });
    }
    if (photo && photo.length > 0 && photo[0].size > 1000000) {
      return res
        .status(400)
        .json({ error: "Photo is required and should be less than 1mb" });
    }

    const slug = slugify(name, { lower: true });

    // Create an array of field names based on the colour value
    const fields = [];
    for (let i = 1; i <= colour; i++) {
      fields.push(`A${i}`);
      fields.push(`B${i}`);
      fields.push(`C${i}`);
    }

    const updatedFields = {};
    fields.forEach((field) => {
      updatedFields[field] = req.fields[field]
        ? parseInt(req.fields[field])
        : 0;
    });

    const photos = [];
    if (photo && photo.length > 0) {
      // check if there are any photos
      for (let i = 0; i < photo.length; i++) {
        photos.push({
          data: fs.readFileSync(photo[i].path),
          contentType: photo[i].type,
        });
      }
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        slug,
        description,
        category,
        photo: photos,
        colour,
        quantity: Object.values(updatedFields),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "A product with the same name already exists",
        message: "Error in updating product!",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in updating product!",
    });
  }
};

// product count
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in fetching product count!",
      error,
      success: false,
    });
  }
};

// search product
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search product API route!",
      error,
    });
  }
};

// get products by category
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting products!",
    });
  }
};

export {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productCountController,
  searchProductController,
  productCategoryController,
  productAllPhotosController,
};

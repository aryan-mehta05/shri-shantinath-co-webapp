import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

const createCategoryController = async (req, res) => {
  try {
    const { name, rate } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required!" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists!",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
      rate,
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category!",
    });
  }
};

//update category
const updateCategoryController = async (req, res) => {
  try {
    const { name, rate } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), rate },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category!",
    });
  }
};

// get all cat
const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories!",
    });
  }
};

// single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get single category successfully!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category!",
    });
  }
};

//delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category!",
      error,
    });
  }
};

export { 
  createCategoryController, 
  updateCategoryController, 
  categoryController, 
  singleCategoryController, 
  deleteCategoryController 
};
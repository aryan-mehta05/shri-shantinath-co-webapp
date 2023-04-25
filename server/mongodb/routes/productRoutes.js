import express from "express";
import {
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
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  formidable({
    keepExtensions: true,
    multiples: true, // allow multiple files
  }),
  createProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

// get all photo
router.get("/product-allphoto/:pid", productAllPhotosController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//routes
router.put("/update-product/:pid", formidable(), updateProductController);

//product count
router.get("/product-count", productCountController);

//search product
router.get("/search/:keyword", searchProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./AddProducts.css";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/category/get-category"
      );
      const data = await response.json();
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const response = await fetch(
        "http://localhost:5000/api/v1/product/create-product",
        {
          method: "POST",
          body: productData,
        }
      );

      const data = await response.json();
      if (data?.success) {
        toast.success(data?.message);
        resetForm();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setQuantity("");
    setPhoto("");
  };

  return (
    <form onSubmit={handleCreate}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Product Description</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        placeholder="Select a category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="photo">Product Photo</label>
      <input
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <button type="submit">CREATE PRODUCT</button>
    </form>
  );
};

export default AddProducts;

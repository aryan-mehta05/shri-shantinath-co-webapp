import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./AddProducts.css";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [colour, setColour] = useState("");
  const [quantities, setQuantities] = useState([]);
  const [photo, setPhoto] = useState([]);

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
      productData.append("category", category);
      productData.append("colour", colour);

      for (let i = 0; i < quantities.length; i++) {
        productData.append(`A${i + 1}`, quantities[i].A);
        productData.append(`B${i + 1}`, quantities[i].B);
        productData.append(`C${i + 1}`, quantities[i].C);
      }

      if (photo.length > 0) {
        for (let i = 0; i < photo.length; i++) {
          productData.append("photo", photo[i]);
        }
      }

      const response = await fetch(
        "http://localhost:5000/api/v1/product/create-product",
        {
          method: "POST",
          body: productData,
          enctype: "multipart/form-data",
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
    setColour("");
    setQuantities([]);
    setPhoto([]);
  };

  const handleQuantityChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = { ...newQuantities[index], [name]: value };
      return newQuantities;
    });
  };

  const handlePhotoChange = (e, index) => {
    const newPhoto = [...photo];
    newPhoto[index] = e.target.files[0];
    setPhoto(newPhoto);
  };

  const handleColourChange = (e) => {
    const colourIndex = Number(e.target.value);
    const newQuantities = Array(colourIndex).fill({ A: "", B: "", C: "" });
    const newPhoto = Array(colourIndex).fill(null);
    setQuantities(newQuantities);
    setPhoto(newPhoto);
    setColour(e.target.value);
  };

  return (
    <form onSubmit={handleCreate}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="colour">Colour:</label>
      <select
        id="colour"
        name="colour"
        value={colour}
        onChange={handleColourChange}
        required
      >
        <option value="">Select a colour</option>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      {quantities.map((quantity, index) => (
        <div key={index}>
          <label htmlFor={`A${index + 1}`}>A-{index + 1}:</label>
          <input
            type="number"
            id={`A${index + 1}`}
            name="A"
            value={quantity.A}
            onChange={(e) => handleQuantityChange(e, index)}
            required
          />

          <label htmlFor={`B${index + 1}`}>B-{index + 1}:</label>
          <input
            type="number"
            id={`B${index + 1}`}
            name="B"
            value={quantity.B}
            onChange={(e) => handleQuantityChange(e, index)}
            required
          />

          <label htmlFor={`C${index + 1}`}>C-{index + 1}:</label>
          <input
            type="number"
            id={`C${index + 1}`}
            name="C"
            value={quantity.C}
            onChange={(e) => handleQuantityChange(e, index)}
            required
          />

          <label htmlFor={`photo${index + 1}`}>Photo-{index + 1}:</label>
          <input
            type="file"
            id={`photo${index + 1}`}
            name="photo"
            accept="image/*"
            onChange={(e) => handlePhotoChange(e, index)}
            required
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProducts;

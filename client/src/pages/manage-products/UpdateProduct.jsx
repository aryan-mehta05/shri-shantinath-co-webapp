import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [colour, setColour] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantities, setQuantities] = useState([]);
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );
      const { product } = await response.json();
      setName(product.name);
      setId(product._id);
      setDescription(product.description);
      setColour(product.colour);
      setQuantity(product.quantity);
      setCategory(product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/category/get-category"
      );
      const { success, category } = await response.json();
      if (success) {
        setCategories(category);
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("colour", colour);

      if (photo && photo.length > 0) {
        productData.append("photo", photo[0]);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        {
          method: "PUT",
          body: productData,
          enctype: "multipart/form-data",
        }
      );

      const data = await response.json();
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const response = await fetch(
        `http://localhost:5000/api/v1/product/delete-product/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      toast.success("Product deleted successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchProductImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/product-allphoto/${id}`
      );
      const blob = await response.clone().blob(); // clone the response before using it
      setPhoto(blob);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductImage();
  }, [id]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setColour("");
    setQuantity([]);
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
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="product-container">
          <div className="product-content">
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate}>
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

                  <label htmlFor={`photo${index + 1}`}>
                    Photo-{index + 1}:
                  </label>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

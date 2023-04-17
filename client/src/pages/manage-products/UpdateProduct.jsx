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
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
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
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const response = await fetch(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        {
          method: "PUT",
          body: productData,
        }
      );
      const data = await response.json();
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
      // const response = await fetch(
      //   `http://localhost:5000/api/v1/product/product-photo/${id}`
      // );
      const blob = await response.clone().blob(); // clone the response before using it
      setPhoto(blob);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductImage();
  }, [id]);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="product-container">
          <div className="product-content">
            <h1>Update Product</h1>
            <div className="form-container">
              <div>Category: </div>
              <select
                className="form-select "
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="">
                <div>Photo: </div>
                <label className="custom-file-upload">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {/* <div className="">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="product-image"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:5000/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="product-image"
                    />
                  </div>
                )}
              </div> */}
              <div className="">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="product-image"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    {/* Show a placeholder image or loading spinner while the image is being fetched */}
                    <img
                      // src="/placeholder.jpg"
                      alt="product_photo"
                      height={"200px"}
                      className="product-image"
                    />
                  </div>
                )}
              </div>
              <div className="">
                <div>Name: </div>
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <div>Description: </div>
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="">
                <div>Quantity: </div>
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="">
                <button className="btn btn-update" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="">
                <button className="btn btn-delete" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

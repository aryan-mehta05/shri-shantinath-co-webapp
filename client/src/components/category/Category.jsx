import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [rate, setRate] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/category/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, rate }),
        }
      );
      const data = await response.json();
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        setRate("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all cat
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

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updatedName, rate }), // set the new rate value
        }
      );
      const data = await response.json();
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setName(""); // Clear name field
        setRate(""); // Clear rate field
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/category/delete-category/${pId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="category-page">
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Rate:
          <input
            type="text"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <span>{category.name}</span>
            <span>{category.rate}</span>
            <button
              onClick={() => {
                setSelected(category);
                setVisible(true);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {visible && (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            />
          </label>
          <label>
            Rate:
            <input
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Category;

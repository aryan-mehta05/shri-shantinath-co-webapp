import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoIosAlert } from 'react-icons/io';
// import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useMediaQuery } from '@material-ui/core';
import "./ManageProducts.css";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [categories, setCategories] = useState([]);
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const iconSize = isMobile ? 15 : 20;
  const updateMessageIconSize = isMobile ? 13: 20;

  const handleCreateCategory = async (e) => {
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
        setCreateCategoryVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form!");
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

  const handleScroll = () => {
    setTimeout(() => {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="main-container">
          <div className="title-top">
            <h1 className="manage-products-title">Manage Products</h1>
            <button
              className="plus-button"
              onClick={() => {
                setCreateCategoryVisible(!createCategoryVisible);
              }}
            >
              +
            </button>
          </div>
          {createCategoryVisible && (
            <form className="category-form" onSubmit={handleCreateCategory}>
              <div className="form-child">
                <label className="name">
                  NAME
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter category name..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="form-child">
                <label className="rate">
                  RATE
                  <input
                    type="text"
                    value={rate}
                    placeholder="Enter category rate..."
                    onChange={(e) => setRate(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button className="category-button" type="submit">Create</button>
            </form>
          )}
          <hr className="main-divider" />

          <ul>
            {categories.map((category) => (
                <li className="category-list-item" key={category._id}>
                  <div className="category-list-left" onClick={() => {
                    navigate("/" + category.slug);
                  }}>
                    <span className="category-name">{category.name}</span>
                    <span className="category-rate">{category.rate}</span>
                  </div>

                  {/* <div className="util-dots">
                    <button>
                      <BiDotsVerticalRounded size={20} />
                    </button>
                  </div> */}

                  <div className="category-list-right">
                    <button
                      className="category-button edit-button"
                      onClick={() => {
                        setSelected(category);
                        setSelectedCategory(category.name);
                        setVisible(true);
                        handleScroll();
                      }}
                    >
                      <AiFillEdit size={iconSize} />
                    </button>
                    <button className="category-button delete-button" onClick={() => handleDelete(category._id)}><AiFillDelete size={iconSize} /></button>
                  </div>
                </li>
            ))}
          </ul>

          {visible && (
            <>
              <hr className="edit-divider"/>
              <p className="update-message"><IoIosAlert size={updateMessageIconSize} style={{ paddingRight: '3px' }} /> UPDATING [ <span>{selectedCategory}</span> ] . . .</p>
              <form className="update-form" ref={targetRef}>
                <div className="update-list-left">
                  <label>
                    Name
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      required
                    />
                  </label>
                  <label className="update-rate">
                    Rate
                    <input
                      type="text"
                      className="rate-input"
                      style={ isMobile ? {marginLeft: "15px"} : {marginLeft: "25px"}}
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      required
                    />
                  </label>
                </div>
                
                <div className="update-list-right">
                  <button className="category-button update-button" type="submit" onClick={handleUpdate}>Update</button>
                  <button 
                    className="category-button cancel-button" 
                    type="submit" 
                    onClick={() => {
                      setVisible(false);
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
              <hr className="edit-divider"/>
            </>
          )}
          {/* <Category /> */}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;

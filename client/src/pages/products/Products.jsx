import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Category from "../../components/category/Category";

const Products = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Category />
      </div>
    </div>
  );
};

export default Products;

import React, { Fragment, useEffect } from "react";
import { CgMouse } from 'react-icons/cg'; // importing the cg mouse
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";

const product = {
    name:"Blue Tshirt",
     image:"url",
    price:"2000",
    _id:"bsjkabih"
}
const Home = () => {
  return (
    <Fragment>
         
         <MetaData title="ECOMMERCEANT" />

         <div className="banner">
            <p>Welcome to ECOMMERCEANT</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse/>
              </button>
            </a>
          </div>
          
          <h2 className="homeHeading">Featured Products</h2>
          
          <div className="container" id="container">
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
               <ProductCard product = {product}/>
          </div>

    </Fragment>
  )
}

export default Home
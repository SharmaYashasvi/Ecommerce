import React, { Fragment ,useEffect} from "react";
import { CgMouse } from 'react-icons/cg'; // importing the cg mouse
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";


const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
 const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getProduct());
  }, [dispatch]);

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
          {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

    </Fragment>
  )
}

export default Home
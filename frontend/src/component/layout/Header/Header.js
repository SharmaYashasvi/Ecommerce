import React from "react";
import { ReactNavbar } from "overlay-navbar";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo.png";

// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

const options = { // old things in overlay navbar is not working fine currently
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "10vmax",
  navColor1: "rgba(0,0,0,0.4)",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact Me",
  link4Text: "About Me",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon:true,
  profileIconColor: "white",
  profileIconColorHover: "#eb4034",
  ProfileIconElement: MdAccountCircle, 
  searchIcon:true,
  searchIconColor: "white",
  searchIconColorHover: "#eb4034",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "white",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  CartIconElement:MdAddShoppingCart,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;

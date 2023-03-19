import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCEANT</h1>
        <p>High Quality is first priority of ECOMMERCEAN</p>

        <p>Copyrights 2025 &copy; Yashasvi Sharma</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://sharmayashasvi.github.io/MeYashasvi_Profile/">My Protfolio</a>
        <a href="https://instagram.com/yashasvi_6601">Instagram</a>
       
      </div>
    </footer>
  );
};

export default Footer;

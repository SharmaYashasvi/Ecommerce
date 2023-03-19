import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="https://sharmayashasvi.github.io/MeYashasvi_Profile/" rel="noreferrer" target={"_blank"}>
        <Button>Visit Portfolio</Button>
      </a>
    </div>
  );
};

export default Contact;

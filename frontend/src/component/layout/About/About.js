import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
// import YouTubeIcon from "@material-ui/icons/YouTube";
// import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/yashasvi_6601/";
  };

  const visitfoodapp = () => {
    window.location = "https://foodapp-r38q.onrender.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Yashasvi Sharma</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by me. Only with the
              purpose to learn MERN Stack....
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Other Projects..</Typography>
            {/* <a
              href="https://foodapp-r38q.onrender.com/"
              target="blank"
            > Visit Food App
            </a> */}

             <Button onClick={visitfoodapp} color="primary">
              Visit Food App
            </Button>

            {/* <a href="https://instagram.com/yashasvi_6601/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

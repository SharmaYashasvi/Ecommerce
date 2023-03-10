// import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  // const options = {
  //   value: review.rating,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  const options = {
    edit:false,
    color: "rgba(20,20,20,01)",
    activeColor:"tomato",
    size: window.innerWidth < 600 ? 20 :25,
    value: review.rating,
    isHalf:true
  };


  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      {/* <Rating {...options} /> */}
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

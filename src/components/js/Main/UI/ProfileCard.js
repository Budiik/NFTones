import React from "react";
import "../../../css/Main/ProfileCard.css";
import profpic from "../profpic.jpg";
import discordlogo from "../discordlogo.png";
import instagramlogo from "../instagramlogo.png";
import twitterlogo from "../twitterlogo.png";

/* Manager profile card */

const ProfileCard = () => {
  return (
    <div className="ProfileCard">
      <img src={profpic} className="profpic"></img>

      <p className="description">Jan Novotný - NFTones manager, mastermind</p>
      
      
    </div>
  );
};

export default ProfileCard;

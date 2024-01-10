import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="info-box">
      <p className="font-medium sm:text-xl text-center">{text}</p>
      <Link to={link} className="neo-brutalism-orange-cantaloupe neo-btn">
        <p className="text-white">{btnText}</p>
        <img src={arrow} className="w-4 h-4 object-contain" />
      </Link>
    </div>
  );
};

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-biege py-4 px-8 text-black mx-8">
      Hi, I am <span className="font-semibold">Archies Singh</span> 👋
      <br />
      Software Engineer from Bengaluru
    </h1>
  ),
  2: (
    <h1>
      <InfoBox
        text="Worked with many companies"
        link="/about"
        btnText="Learn More"
      />
    </h1>
  ),
  3: (
    <h1>
      <InfoBox
        text="Led multiple projects success over the years. Curious about the impact"
        link="/projects"
        btnText="Visit my Portfolio"
      />
    </h1>
  ),
  4: (
    <h1>
      <InfoBox
        text="Need a Project done or looking for a dev ?  I am just a few  KeyStrokes Away"
        link="/contact"
        btnText="Lets Talk"
      />
    </h1>
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;

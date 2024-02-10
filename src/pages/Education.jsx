import React, { useState } from "react";
import { education } from "../constants";
import Cta from "../components/Cta";
import CircleView from "../components/CircleView";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const Education = () => {
  const [showAll, setShowAll] = useState(false);
  const maxItemsToShow = 3;
  const maxItemsToShowSpecialPoints = 2;
  const [showPoints, setShowPoints] = useState({});
  const [maxSpecialPointsToShow, setMaxSpecialPointsToShow] = useState({});

  const handleTogglePoints = (schoolName) => {
    setShowPoints((prevPoints) => ({
      ...prevPoints,
      [schoolName]: !prevPoints[schoolName],
    }));
    setMaxSpecialPointsToShow((prevPoints) => ({
      ...prevPoints,
      [schoolName]: !prevPoints[schoolName],
    }));
  };

  return (
    <section className="max-container">
      <div>
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Education
        </span>
      </h1>
        <div className="mt-5 flex gap-3 flex-col text-slate-500">
          <p>
          Explore my academic journey and qualifications, where a passion for learning meets a commitment to excellence. Discover the foundations that shape my expertise and drive for continuous growth in the education section .
          </p>
        </div>
        <div className="mt-12 flex">
          <VerticalTimeline>
            {education
              .slice(
                0,
                showAll
                  ? education.length
                  : maxItemsToShow || maxItemsToShowSpecialPoints
              )
              .map((education) => (
                <VerticalTimelineElement
                  key={education.school_name}
                  date={education.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={education.icon}
                        alt={education.company_name}
                        className="object-cover w-full h-full"
                        style={{ padding: 10 }}
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: education.iconBg,
                    boxShadow: "none",
                  }}
                  iconStyle={{ backgroundColor: education.iconBg }}
                >
                  <div>
                    <h2 className="text-black text-xl font-poppins font-semibold">
                      {education.title}
                    </h2>
                    <div className="flex flex-col">
                      <p
                        className="text-black-500 font-medium font-base"
                        style={{ margin: 0 }}
                      >
                        {education.school_name} | grade : {education.grade}
                      </p>
                      <p>{education.location}</p>
                    </div>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-5">
                    {education?.points
                      ?.slice(
                        0,
                        showAll || showPoints[education.school_name]
                          ? education.points.length
                          : maxItemsToShow
                      )
                      ?.map((point, index) => (
                        <li
                          key={`education point - ${index}`}
                          className="text-black-500/50 font-normal pl-1 text-sm"
                        >
                          {point}
                        </li>
                      ))}
                  </ul>
                  <ul className="my-5 list-disc ml-5 space-y-5">
                    {education?.specialPoints
                      ?.slice(
                        0,
                        showAll || maxSpecialPointsToShow[education.school_name]
                          ? education.specialPoints.length
                          : maxItemsToShowSpecialPoints
                      )
                      ?.map((point, index) => (
                        <div key={`education specialPoints - ${index}`}>
                          <h3>{point?.heading}</h3>
                          {point?.points?.map((subPoints, subIndex) => (
                            <li
                              key={`education specialPoints - ${index} - subPoint - ${subIndex}`}
                              className="text-black-500/50 font-normal pl-1 text-sm"
                            >
                              {subPoints}
                            </li>
                          ))}
                        </div>
                      ))}
                  </ul>
                  {education?.points
                    ? education?.points?.length > maxItemsToShow && (
                        <button
                          className="mt-3 text-blue-500"
                          onClick={() =>
                            handleTogglePoints(education.school_name)
                          }
                        >
                          {showPoints[education.school_name]
                            ? "Hide"
                            : "Show More"}
                        </button>
                      )
                    : education?.specialPoints?.length >
                        maxItemsToShowSpecialPoints && (
                        <button
                          className="mt-3 text-blue-500"
                          onClick={() =>
                            handleTogglePoints(education.school_name)
                          }
                        >
                          {maxSpecialPointsToShow[education.school_name]
                            ? "Hide"
                            : "Show More"}
                        </button>
                      )}
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
        </div>
      </div>
      <hr className="border-slate-200" />
      <Cta />
    </section>
  );
};

export default Education;

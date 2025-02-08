import React, { Suspense, useState } from "react";
import { skills, experiences } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Cta from "../components/Cta";
// import CircleView from "../components/CircleView";
import DropDown from "../components/Dropdown";
import { CertificateCarousal } from "../components/CertificateCarousal";

const About = () => {
  const [showAllMap, setShowAllMap] = useState({});

  const toggleShowAll = (companyName) => {
    setShowAllMap((prev) => ({
      ...prev,
      [companyName]: !prev[companyName], // Toggle state for the selected experience
    }));
  };

  return (
    <section className="max-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="head-text">
            Hello I am{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">
              Archies Singh
            </span>
          </h1>
        </div>
        {window.innerWidth > 768 && (
          <div>
            <DropDown />
          </div>
        )}
      </div>
      <div className="mt-5 flex gap-3 flex-col text-slate-500">
        <div>
          {window.innerWidth < 768 && (
            <div className="grid justify-items-stretch">
              <div className="flex justify-self-center">
                <DropDown />
              </div>
            </div>
          )}
        </div>
        <div>
          <p>
            Software Developer based in Bengaluru, India, with expertise in
            front-end development, AI agents, and backend technologies.
            Passionate about building seamless user experiences using React,
            Next.js, and TypeScript, while leveraging Node.js and AI to create
            intelligent, scalable applications.
          </p>
        </div>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div key={skill.name} className="relative group">
              <div className="block-container rounded-full w-20 h-20 pt-6 shadow-xl">
                <div className="btn-front rounded-full flex justify-center items-center shadow">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-[80%] h-[60%] object-contain"
                  />
                </div>
                <div className="btn-back rounded-full" />
              </div>

              {/* Tooltip for skill name */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex gap-3 flex-col text-slate-500">
          <p>
            I worked as an intern and full-time with some companies, leveling up
            my skills teaming up with smart people. Here's the rundown:
          </p>
        </div>
        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => {
              const isExpanded = showAllMap[experience.company_name] || false;
              const visiblePoints = isExpanded
                ? experience.points
                : experience.points.slice(0, 3);

              return (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[80%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                  iconStyle={{ backgroundColor: experience.iconBg }}
                >
                  <div>
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 font-medium font-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-5">
                    {visiblePoints.map((point, index) => (
                      <li
                        key={index}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  {experience.points.length > 3 && (
                    <button
                      onClick={() => toggleShowAll(experience.company_name)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
      <div className="py-16 inset-0">
        <h3 className="subhead-text">My Certifications</h3>
        <div className="mt-5 flex gap-3 flex-col text-slate-500">
          <div>
            <p>
              Explore my journey of continuous learning and growth through
              various certifications. These courses have equipped me with
              valuable skills to enhance my expertise in different domains.
            </p>
          </div>
          <CertificateCarousal />
        </div>
      </div>
      <hr className="border-slate-200" />
      <Cta />
    </section>
  );
};

export default About;

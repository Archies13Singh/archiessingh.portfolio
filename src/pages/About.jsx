import React, { Suspense } from "react";
import { skills, experiences } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Cta from "../components/Cta";
import CircleView from "../components/CircleView";

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I am{" "}
        <span className="blue-gradient font-semibold drop-shadow">Archies</span>
      </h1>
      <div className="mt-5 flex gap-3 flex-col text-slate-500">
        <p>
          Software Engineer based in Bengaluru, India. As a passionate front-end
          developer, I possess a keen eye for design and a love for creating
          seamless, user-friendly experiences. With a robust foundation in HTML,
          CSS, and JavaScript, I bring a blend of creativity and technical
          expertise to the table..
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div className="block-container rounded-full  w-20 h-20 pt-6 shadow-xl">
              <div className="btn-front rounded-full flex justify-center items-center shadow">
                <CircleView url={skill.imageUrl} key={skill.name} />
              </div>
              <div className="btn-back rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex gap-3 flex-col text-slate-500">
          <p>
            I worked as an intern and fulltime with some companies , leveling up
            my skills teaming up with smart people. Here's the rundown :
          </p>
        </div>
        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => (
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
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience point - ${index}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
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

export default About;

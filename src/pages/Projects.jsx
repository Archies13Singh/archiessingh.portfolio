import React, { useState } from "react";
import { projects } from "../constants";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import Cta from "../components/Cta";

const Projects = () => {
  const MAX_TECH_DISPLAY = 4;
  const [showMoreTech, setShowMoreTech] = useState(false);
  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Step into a world where code weaves magic, and pixels tell tales of
          innovation. Explore my web development portfolio—a showcase of
          seamless designs and flawless functionality. Each project is a journey
          through creativity, where the digital canvas comes alive. Join me in
          pushing the boundaries of web possibilities. 🚀🌐
        </p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project, index) => {
          const [showMore, setShowMore] = useState(false);

          return (
            <div className="lg:w-[400px] w-full" key={project.name}>
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={project.iconUrl}
                    alt="Project Icon"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-col">
                <h4 className="text-2xl font-poppins font-semibold">
                  {project.name}
                </h4>
                <div
                  className={`flex gap-2 items-start ${
                    showMore ? "items-end" : "items-start"
                  }`}
                >
                  <p
                    className={`mt-2 text-slate-500 ${
                      showMore ? "" : "line-clamp-2"
                    }`}
                  >
                    {project.description}
                  </p>
                  {project.description.length > 100 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="text-blue-600 font-semibold mt-1"
                    >
                      {showMore ? "🔼" : "🔽"}
                    </button>
                  )}
                </div>

                <div className="mt-2">
                  <p
                    className={`font-semibold text-base tracking-wider ${project.text_theme}`}
                  >
                    Technology Used
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                    {project.tech_stack &&
                      Array.isArray(project.tech_stack) &&
                      project.tech_stack
                        .slice(
                          0,
                          showMoreTech
                            ? project.tech_stack.length
                            : MAX_TECH_DISPLAY
                        )
                        .map((stack, index) => (
                          <img
                            src={stack}
                            key={stack}
                            alt={`Tech Icon ${index}`}
                            className="object-cover"
                            width={45}
                            height={45}
                          />
                        ))}
                  </div>
                  {project.tech_stack.length > MAX_TECH_DISPLAY && (
                    <button
                      onClick={() => setShowMoreTech(!showMoreTech)}
                      className="text-blue-600 font-semibold mt-1"
                    >
                      {showMoreTech ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between gap-2 font-poppins">
                  {project.live_link && (
                    <div className="flex gap-1">
                      <Link
                        to={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600"
                      >
                        Live Link
                      </Link>
                      <img
                        src={arrow}
                        alt="arrow"
                        className="object-contain transform -rotate-45"
                        width={12}
                        height={12}
                      />
                    </div>
                  )}
                  <div className="flex gap-1">
                    <Link
                      to={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600"
                    >
                      Github Link
                    </Link>
                    <img
                      src={arrow}
                      alt="arrow"
                      className="object-contain transform -rotate-45"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="border-slate-200" />
        <Cta />
      </div>
    </section>
  );
};

export default Projects;

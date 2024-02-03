import React from "react";
import { projects } from "../constants";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import Cta from "../components/Cta";

const Projects = () => {
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
        {projects.map((project, index) => (
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
              <p className="mt-2 text-slate-500">{project.description}</p>

              <div className="mt-2">
                <p
                  className={`font-semibold text-base tracking-wider ${project.text_theme}`}
                >
                  Techology Used
                </p>
                <div className="flex justify-evenly p-4 flex-wrap">
                  {/* {console.log(project.tech_stack)} */}
                  {project.tech_stack &&
                    Array.isArray(project.tech_stack) &&
                    project.tech_stack.map((stack, index) => (
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
              </div>
              <div className="mt-5  items-center flex justify-between gap-2 font-poppins">
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
                <div className="flex  gap-1">
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
        ))}
        <hr className="border-slate-200" />
        <Cta />
      </div>
    </section>
  );
};

export default Projects;

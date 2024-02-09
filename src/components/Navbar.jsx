import React from "react";
import { NavLink } from "react-router-dom";
import FireLogo from "../assets/images/fire-unscreen.gif";

const Navbar = ({ path }) => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-15 h-10 items-center flex font-bold"
      >
        <div
          style={{
            height: "180px",
            marginTop: "32px",
            padding : "10px"
          }}
        >
          <img
            src={FireLogo}
            alt="Your Image Alt Text"
            style={{ width: "100%", height: "80%", objectFit: "cover" }}
          />
        </div>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500"
              : path === "/"
              ? "text-white"
              : "text-black"
          }
        >
          <p style={{ fontSize: "16px" }}>About</p>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500"
              : path === "/"
              ? "text-white"
              : "text-black"
          }
        >
          <p style={{ fontSize: "16px" }}>Project</p>
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500"
              : path === "/"
              ? "text-white"
              : "text-black"
          }
        >
          <p style={{ fontSize: "16px" }}>Education</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

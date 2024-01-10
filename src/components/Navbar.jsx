import React from "react";
import { NavLink } from "react-router-dom";
import FireLogo from "../assets/images/fire-unscreen.gif";

const Navbar = ({ path }) => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-15 h-10 items-center justify-center flex font-bold"
      >
        <div
          style={{
            width: "120px",
            height: "180px",
            padding: "15px",
          }}
        >
          <img
            src={FireLogo}
            alt="Your Image Alt Text"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        {console.log(path)}
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
      </nav>
    </header>
  );
};

export default Navbar;

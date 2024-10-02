import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FireLogo from "../assets/images/fire-unscreen.gif";
import DropDown from "./Dropdown";

const Navbar = ({ path }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const resetMenuTab = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header className="header">
        <div className="items-center justify-center flex font-bold h-10">
          <NavLink to="/" onClick={resetMenuTab}>
            <img
              src={FireLogo}
              alt="Your Image Alt Text"
              width={window.innerWidth <= 768 ? 80 : 100}
              height={window.innerWidth <= 768 ? 80 : 100}
              style={{
                objectFit: "cover",
                marginLeft: 22,
                marginTop: -12,
              }}
            />
          </NavLink>
        </div>

        {/* Condition 1: Display normal nav for big screens */}
        <nav className={`hidden lg:flex text-lg gap-7 font-medium`}>
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

        {/* Condition 2: Display hamburger menu button for small screens */}
        <div className="block lg:hidden pr-7 flex items-center gap-4">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              // Close icon when menu is open
              <img
                src={
                  path === "/"
                    ? "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fclose-icon.svg?alt=media&token=138deebe-991e-456d-ac35-4dd157028059"
                    : "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fclose-icon.svg?alt=media&token=138deebe-991e-456d-ac35-4dd157028059"
                }
                alt="closeicon"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            ) : (
              // Hamburger icon when menu is closed
              <img
                src={
                  path === "/"
                    ? "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fhamburger_home.svg?alt=media&token=d6fbce94-fd02-47f4-ac3f-d641874bf84e"
                    : "https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fhamburger.svg?alt=media&token=4cf08012-6f69-4cb9-913e-2916f9d93359"
                }
                alt="hamburger"
                width={35}
                height={35}
                style={{ objectFit: "contain" }}
              />
            )}
          </button>
        </div>
      </header>

      {/* Vertical format for small screens */}
      <div>
        {isMenuOpen && (
          <div className="lg:hidden mt-20">
            <nav className="flex flex-1 flex-col text-lg font-medium bg-gray-200 z-10   shadow-md">
              <NavLink
                to="/about"
                className="text-black hover:bg-sky-700 hover:text-white"
                style={{
                  display: "block",
                  padding: "8px",
                  transition: "background-color 0.3s ease", // Adding transition for smooth effect
                  textAlign: "center",
                }}
                // onClick={()=>setIsMenuOpen(false)}
              >
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  About
                </span>
              </NavLink>
              <NavLink
                to="/projects"
                className="text-black hover:bg-sky-600 hover:text-white"
                style={{
                  display: "block",
                  padding: "8px",
                  transition: "background-color 0.3s ease",
                  textAlign: "center",
                }}
                // onClick={()=>setIsMenuOpen(false)}
              >
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  Project
                </span>
              </NavLink>
              <NavLink
                to="/education"
                className="text-black hover:bg-sky-500 hover:text-white"
                style={{
                  display: "block",
                  padding: "8px",
                  transition: "background-color 0.3s ease",
                  textAlign: "center",
                }}
                // onClick={()=>setIsMenuOpen(false)}
              >
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  Education
                </span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

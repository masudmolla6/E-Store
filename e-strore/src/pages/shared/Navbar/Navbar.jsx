import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Logo from "../Logo/Logo";
import { scroller } from "react-scroll";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const {user, logOut}=useAuth();

  const handleLogout=async()=>{
    await logOut();
  }

  const isHomePage = location.pathname === "/";

  // Scroll to section
  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
      offset: -80, // Navbar height
    });
    setActiveSection(sectionId);
  };

  // Click on navbar items
  const handleNavClick = (sectionId) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate("/"); // Navigate to Home
      setTimeout(() => scrollToSection(sectionId), 100); // Scroll after route change
    }
  };

  // Scroll listener for Home page
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(""); // Home page na thakle kono active section nai
      return;
    }

    const handleScroll = () => {
      const sections = ["home", "about", "contact"];
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navItems = (
    <>
      <li>
        <button
          onClick={() => handleNavClick("home")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeSection === "home"
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600"
          }`}
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("about")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeSection === "about"
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600"
          }`}
        >
          About Us
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("contact")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeSection === "contact"
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600"
          }`}
        >
          Contact Us
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="w-full h-full">
          <Logo />
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-2">
        {
          user ? <button onClick={()=>handleLogout()} className="btn btn-outline btn-sm">
          LogOut
        </button>:<Link to="/login" className="btn btn-outline btn-sm">
          LogIn
        </Link>
        }
      </div>
    </div>
  );
};

export default Navbar;

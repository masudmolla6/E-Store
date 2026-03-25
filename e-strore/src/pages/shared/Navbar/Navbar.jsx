import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Logo from "../Logo/Logo";
import { scroller } from "react-scroll";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Mobile Drawer state

  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();

  const isHomePage = location.pathname === "/";

  // 🌐 All Devices: Navbar height dynamic
  const navbarRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleLogout = async () => {
    await logOut();
  };

  // 🌐 Scroll to section (Home page)
  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
    setActiveSection(sectionId);
  };

  const handleNavClick = (sectionId) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  // 🌐 Active section highlight
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
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

  // 🌐 Navbar Items
  const navItems = (
    <>
      <li>
        <button
          onClick={() => handleNavClick("home")}
          className={`hover:text-blue-400 transition ${
            activeSection === "home" && "text-blue-400 font-semibold"
          }`}
        >
          Home
        </button>
      </li>
      <li>
        <Link to="products/all" className="hover:text-blue-400 transition">
          Products
        </Link>
      </li>
      <li>
        <Link
          to={`dashboard/${isAdmin ? "adminHome" : "userHome"}`}
          className="hover:text-blue-400 transition"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("about")}
          className={`hover:text-blue-400 transition ${
            activeSection === "about" && "text-blue-400 font-semibold"
          }`}
        >
          About
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("contact")}
          className={`hover:text-blue-400 transition ${
            activeSection === "contact" && "text-blue-400 font-semibold"
          }`}
        >
          Contact
        </button>
      </li>
    </>
  );

  return (
    <>
      {/* 🌐 Navbar Container (ALL DEVICES) */}
      <div
        ref={navbarRef}
        className="navbar sticky top-0 z-50 
        bg-gradient-to-r from-black/80 via-black/60 to-black/80 
        backdrop-blur-xl border-b border-white/10 
        shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-white"
      >
        {/* 📱 Mobile Only: Hamburger Button */}
        <div className="navbar-start flex items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center gap-1 w-10 h-10 rounded-lg 
              hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition"
          >
            <span className="w-5 h-[2px] bg-white"></span>
            <span className="w-5 h-[2px] bg-white"></span>
            <span className="w-5 h-[2px] bg-white"></span>
          </button>

          {/* 🌐 All Devices: Logo */}
          <Link to="/" className="ml-2 flex items-center gap-2 group">
            <div className="transition duration-300 group-hover:scale-110">
              <Logo />
            </div>
          </Link>
        </div>

        {/* 💻 Desktop Only: Horizontal Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navItems}</ul>
        </div>

        {/* 🌐 All Devices: Right Side (Auth) */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-white/30">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                  />
                </div>
              </div>

              <div className="dropdown-content mt-4 z-[100] w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4">
                <div className="text-center">
                  <img
                    className="w-16 rounded-full mx-auto mb-2"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                  />
                  <h3 className="font-semibold">{user?.displayName}</h3>
                  <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
                <div className="divider my-2"></div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-xs bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* 📱 Mobile Only: Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-[150]"
        ></div>
      )}

      {/* 📱 Mobile Only: Drawer Menu */}
      <div
        style={{
          top: navHeight,
          height: `calc(100% - ${navHeight}px)`,
        }}
        className={`fixed left-0 w-[70%] max-w-xs bg-black/60 backdrop-blur-xl text-white z-[200] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Drawer Menu Items */}
        <ul className="flex flex-col gap-6 px-6 text-lg font-medium">
          <li>
            <button
              onClick={() => {
                handleNavClick("home");
                setMenuOpen(false);
              }}
              className="hover:text-blue-400"
            >
              Home
            </button>
          </li>
          <li>
            <Link to="products/all" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link
              to={`dashboard/${isAdmin ? "adminHome" : "userHome"}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleNavClick("about");
                setMenuOpen(false);
              }}
              className="hover:text-blue-400"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleNavClick("contact");
                setMenuOpen(false);
              }}
              className="hover:text-blue-400"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
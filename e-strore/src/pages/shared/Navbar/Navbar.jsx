import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600 transition-colors duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600 transition-colors duration-200"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold underline underline-offset-4"
              : "text-white hover:text-blue-600 transition-colors duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link className="w-full h-full" to="/">
          <Logo />
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-2">
        <button className="btn btn-outline btn-sm white">Login</button>
        <button className="btn btn-primary btn-sm text-white">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;

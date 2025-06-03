import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Navbar = () => {
  const [openDesktopCats, setOpenDesktopCats] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openMobileCats, setOpenMobileCats] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();
  const userDropdownRef = useRef();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const token = localStorage.getItem("token");

  // Update firstName on token change
  useEffect(() => {
    const full = localStorage.getItem("fullName") || "";
    setFirstName(full.split(" ")[0] || "");
  }, [token]);

  // Close desktop categories dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setOpenDesktopCats(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile categories accordion on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setOpenMobileCats(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setOpenUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/auth");
  };

  const categories = [
    { name: "Technology", path: "/categories-technology" },
    { name: "Fashion", path: "/categories-fashion" },
    { name: "Current Affairs", path: "/categories-current-affairs" },
    { name: "Health", path: "/categories-health" },
  ];

  return (
    <nav
      className={`shadow-md relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-primary text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (smaller on mobile/tablet) */}
          <Link
            to="/"
            className={`font-bold ${
              darkMode ? "text-white" : "text-black"
            } text-lg sm:text-xl lg:text-2xl`}
          >
            MyBlog2025
          </Link>

          {/* Desktop menu (≥ lg) */}
          <div className="hidden lg:flex lg:space-x-6 lg:items-center">
            <Link
              to="/"
              className="hover:text-accent transition-colors text-sm lg:text-base"
            >
              Home
            </Link>

            {/* Categories dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setOpenDesktopCats(!openDesktopCats)}
                className="flex items-center hover:text-accent transition-colors text-sm lg:text-base"
              >
                Categories
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {openDesktopCats && (
                <ul
                  className={`absolute right-0 mt-2 w-44 border rounded-md shadow-lg z-20 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-gray-200"
                      : "bg-white border-gray-200 text-black"
                  }`}
                >
                  {categories.map((cat) => (
                    <li key={cat.path}>
                      <Link
                        to={cat.path}
                        onClick={() => setOpenDesktopCats(false)}
                        className="block px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to="/about"
              className="hover:text-accent transition-colors text-sm lg:text-base"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-accent transition-colors text-sm lg:text-base"
            >
              Contact
            </Link>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className={`px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm lg:text-base ${
                darkMode
                  ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200"
                  : "bg-white border-gray-300 placeholder-gray-500 text-black"
              }`}
            />

            {/* Dark mode toggle for desktop */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-1 hover:text-accent transition-colors text-sm lg:text-base"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          {/* Always-visible controls + hamburger */}
          <div className="flex items-center space-x-2">
            {/* User / Register */}
            {token ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setOpenUserDropdown(!openUserDropdown)}
                  className={`flex items-center space-x-1 ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                  } rounded-2xl shadow-lg px-2 py-1 text-xs sm:text-sm lg:text-base hover:opacity-90 transition-colors`}
                >
                  <span>Hi, {firstName}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openUserDropdown && (
                  <ul
                    className={`absolute right-0 mt-2 w-40 border rounded-md shadow-lg z-20 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-white border-gray-200 text-black"
                    }`}
                  >
                    <li>
                      <button
                        onClick={() => {
                          setOpenUserDropdown(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      >
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOpenUserDropdown(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className={`rounded-2xl shadow-lg px-2 py-1 text-xs sm:text-sm lg:text-base ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-accent text-black hover:bg-accent/90"
                } transition-colors`}
              >
                Register
              </Link>
            )}

            {/* Hamburger (always on right; visible below lg) */}
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {openMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet menu (below lg) */}
      {openMobileMenu && (
        <div className="lg:hidden px-4 pb-4" ref={mobileDropdownRef}>
          {/* User/Register at top */}
          {token ? (
            <div className="py-2 border-b mb-2">
              <button
                onClick={() => {
                  setOpenUserDropdown(true);
                  setOpenMobileMenu(false);
                }}
                className="block text-sm mb-1"
              >
                Hi, {firstName}
              </button>

              {/* Search */}
              <input
                type="text"
                placeholder="Search..."
                className={`w-full mt-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-gray-200"
                    : "bg-white border-gray-300 placeholder-gray-500 text-black"
                }`}
              />
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpenMobileMenu(false)}
              className="block py-2 text-sm rounded-md bg-accent text-black hover:bg-accent/90 transition-colors"
            >
              Register
            </Link>
          )}

          <Link
            to="/"
            onClick={() => setOpenMobileMenu(false)}
            className="block py-2 text-sm hover:text-accent transition-colors"
          >
            Home
          </Link>

          {/* Categories accordion */}
          <button
            onClick={() => setOpenMobileCats(!openMobileCats)}
            className="w-full text-left py-2 flex items-center justify-between text-sm hover:text-accent transition-colors"
          >
            Categories
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d={
                  openMobileCats
                    ? "M5.23 12.79a.75.75 0 001.06-.02L10 9.06l3.71 3.71a.75.75 0 001.06-1.06l-4.24-4.24a.75.75 0 00-1.06 0L5.23 11.73a.75.75 0 00.02 1.06z"
                    : "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                }
              />
            </svg>
          </button>
          {openMobileCats && (
            <div className="pl-4 mb-2">
              {categories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  onClick={() => {
                    setOpenMobileMenu(false);
                    setOpenMobileCats(false);
                  }}
                  className="block py-1 text-sm hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/about"
            onClick={() => setOpenMobileMenu(false)}
            className="block py-2 text-sm hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpenMobileMenu(false)}
            className="block py-2 text-sm hover:text-accent transition-colors"
          >
            Contact
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-3 flex items-center space-x-2 text-sm hover:text-accent transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

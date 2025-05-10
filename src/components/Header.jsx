import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NavLinks({ className = "" }) {
  const links = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/countries" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      {links.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          title={name}
          className={`text-base font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-md ${className}`}
        >
          {name}
        </Link>
      ))}
    </>
  );
}

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close the mobile menu on any window resize or route change
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed z-50 w-screen bg-white pb-6 lg:pb-0 shadow-2xl">
      <div className="px-3 mx-auto max-w-7xl sm:px-4 lg:px-6">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" title="Home" className="flex items-center space-x-2">
              <img
                className="w-auto h-8 lg:h-10"
                src="/images/crusious_logo.png"
                alt="CRUSIOUS Logo"
              />
              <span className="text-xl font-semibold text-gray-800">
                CRUSIOUS
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <NavLinks />
          </div>

          {/* Call to Action + Theme Toggle */}
          <div className="hidden lg:inline-flex items-center space-x-4 ml-10">
            {user ? (
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-center flex items-center justify-center text-white">
                  {user.user.name.charAt(0)}{" "}
                </div>
              </Link>
            ) : (
              <button
                variant="contained"
                color="primary"
                className="bg-violet-500 py-2 px-5 font-semibold rounded-3xl shadow-2xl"
                href="/login"
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="px-6 space-y-1">
              <NavLinks className="inline-flex py-2" />
            </div>
            {/* Mobile Login/Profile Button */}
            <div className="mt-4 px-6">
              {user ? (
                <div className="w-10 h-10 rounded-full bg-gray-300 text-center flex items-center justify-center text-white">
                  {user.name.charAt(0)} {/* Display first letter of the name */}
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-violet-500 py-2 px-5 rounded-3xl shadow-2xl w-full"
                  href="/login"
                >
                  Login
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

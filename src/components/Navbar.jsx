import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { getToken, removeToken } from "../utils/token";

// 🔥 Icons
import { FaMoon, FaSun, FaUserShield, FaHome } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/admin");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 transition ${
      isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
    }`;

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    if (open) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="bg-gray-900 dark:bg-black text-white px-4 md:px-8 py-3 flex justify-between items-center relative"
    >
      {/* 🔷 LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaHome />
        <img
          src="/SP.png"
          alt="SP Logo"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* 💻 DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>

        {/* 🔐 ADMIN */}
        {isLoggedIn ? (
          <>
            <NavLink
              to="/dashboard"
              className="text-green-400 flex items-center gap-1"
            >
              <FaUserShield /> Dashboard
            </NavLink>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 rounded-md text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/admin"
            className="px-3 py-1 bg-blue-500 rounded-md text-sm flex items-center gap-1"
          >
            <FaUserShield /> Login
          </NavLink>
        )}

        {/* 🌙 DARK MODE */}
        <button onClick={toggleTheme} className="text-xl">
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* 📱 MOBILE MENU BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* 📱 MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-14 left-0 w-full bg-gray-800 flex flex-col items-center gap-4 py-4 md:hidden z-50"
          >
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/projects" onClick={() => setOpen(false)}>
              Projects
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>

            {/* ADMIN MOBILE */}
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/admin" onClick={() => setOpen(false)}>
                Login
              </NavLink>
            )}

            {/* DARK MODE */}
            <button onClick={toggleTheme} className="text-xl">
              {dark ? <FaSun /> : <FaMoon />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

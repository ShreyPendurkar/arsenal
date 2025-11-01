import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const controls = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/form" }
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-lg z-50 flex justify-between items-center px-8 py-3">
      <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-300 tracking-tight">
        <Link to={user ? "/dashboard" : "/login"}>Generic Site</Link>
      </div>
      <div className="hidden md:flex items-center justify-center gap-6 font-semibold text-gray-700 dark:text-gray-300">
        {user && controls.map(c => (
          <Link
            key={c.name}
            to={c.path}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition ${
              location.pathname === c.path ? "text-blue-600 dark:text-blue-400 font-bold underline underline-offset-4" : ""
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          title="Toggle dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        {!user && (
          <>
            <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Login</Link>
            <Link to="/register" className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition">Register</Link>
          </>
        )}
        {user && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center gap-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title={`${user.username} menu`}
              aria-expanded={menuOpen}
            >
              <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-300" />
              <span className="hidden sm:block font-semibold text-gray-700 dark:text-gray-100">{user.username}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 rounded shadow-lg py-2 w-40 ring-1 ring-black ring-opacity-5 z-20">
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 transition rounded"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

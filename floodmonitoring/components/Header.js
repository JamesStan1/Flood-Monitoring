'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LoginForm from '../app/login/page'; // ✅ Import reusable login form

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user JSON:", err);
        localStorage.removeItem("user"); // remove corrupted data
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleDashboardClick = () =>
    !user
      ? alert("Please log in first to access the Dashboard.")
      : router.push("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-blue-800 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Flood Icon" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Flood Monitoring System</h1>
        </div>

        {/* ✅ Navigation */}
        <nav className="flex-1">
          <ul className="flex justify-center space-x-6">
            <li>
              <button onClick={() => router.push("/")} className="text-l font-bold hover:text-blue-200">
                Home
              </button>
            </li>
            <li>
              <button onClick={handleDashboardClick} className="text-l font-bold hover:text-blue-200">
                Dashboard
              </button>
            </li>
            <li><a href="/alerts" className="text-l font-bold hover:text-blue-200">Alerts</a></li>
            <li><a href="/reports" className="text-l font-bold hover:text-blue-200">Reports</a></li>
            <li><a href="/about" className="text-l font-bold hover:text-blue-200">About</a></li>
          </ul>
        </nav>

        {/* ✅ Right Side */}
        {!user ? (
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-1"
            >
              {user.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-blue-800 shadow-lg rounded-lg w-32">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ LOGIN POPUP MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <LoginForm
            onSuccess={(userData) => {
              setUser(userData);
              setShowLoginModal(false);
              router.push("/dashboard"); // ✅ Redirect to dashboard
            }}
            onCancel={() => setShowLoginModal(false)}
          />

        </div>
      )}
    </header>
  );
}

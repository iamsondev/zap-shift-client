import React, { useState } from "react";
import { Outlet, Link } from "react-router"; // use react-router-dom
import Logo from "../Pages/Shared/Logo";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar - Large Screens */}
      <aside className="hidden lg:block w-72 bg-base-200 p-6 shadow-md">
        <div className="m-5">
          <Logo />
        </div>
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul className="menu text-base-content space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="hover:bg-base-300 rounded-lg p-2 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/myParcels"
                className="hover:bg-base-300 rounded-lg p-2 transition"
              >
                My Parcel
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar - Mobile Only */}
        <div className="lg:hidden w-full bg-base-100 shadow p-4 flex justify-between items-center">
          <span className="font-bold text-lg">Dashboard</span>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-base-200 shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="block hover:bg-base-300 rounded-lg p-2 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/myParcels"
                    className="block hover:bg-base-300 rounded-lg p-2 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Parcel
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

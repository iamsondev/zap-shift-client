import React, { useState } from "react";
import { Outlet, Link } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaBars,
  FaUserEdit,
  FaSearchLocation,
  FaUserPlus,
  FaUserCheck,
  FaUserShield,   // 👈 Make Admin icon
} from "react-icons/fa";
import Logo from "../Pages/Shared/Logo";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { to: "/dashboard", label: "Home", icon: <FaHome /> },
    { to: "/dashboard/myParcels", label: "My Parcels", icon: <FaBoxOpen /> },
    { to: "/dashboard/paymentHistory", label: "Payment History", icon: <FaCreditCard /> },
    { to: "/dashboard/trackPackage", label: "Track Package", icon: <FaSearchLocation /> },
    { to: "/dashboard/updateProfile", label: "Update Profile", icon: <FaUserEdit /> },
    { to: "/dashboard/pending-riders", label: "Pending Riders", icon: <FaUserPlus /> },
    { to: "/dashboard/active-riders", label: "Active Riders", icon: <FaUserCheck /> },
    { to: "/dashboard/makeAdmin", label: "Make Admin", icon: <FaUserShield /> }, // 👈 New item
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar for mobile */}
        <div className="lg:hidden w-full bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Dashboard</span>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <FaBars className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Page Outlet */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { Outlet, Link } from "react-router"; // use react-router-dom
import Logo from "../Pages/Shared/Logo";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaBars,
  FaUserEdit,
  FaSearchLocation,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Define menu items once
  const menuItems = [
    { to: "/dashboard", label: "Home", icon: <FaHome /> },
    { to: "/dashboard/myParcels", label: "My Parcel", icon: <FaBoxOpen /> },
    { to: "/dashboard/paymentHistory", label: "Payment History", icon: <FaCreditCard /> },
    { to: "/dashboard/trackPackage", label: "Track a Package", icon: <FaSearchLocation /> },
    { to: "/dashboard/updateProfile", label: "Update Profile", icon: <FaUserEdit /> },
  ];

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
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 hover:bg-base-300 rounded-lg p-2 transition"
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
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
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-base-200 shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-2 hover:bg-base-300 rounded-lg p-2 transition"
                      onClick={() => setMenuOpen(false)} // ✅ closes menu on click
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                ))}
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

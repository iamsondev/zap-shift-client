import React, { useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaBars,
  FaUserEdit,
  FaSearchLocation,
  FaUserPlus,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa";
import Logo from "../Pages/Shared/Logo";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <p>Checking role...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/myParcels"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaBoxOpen /> My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaCreditCard /> Payment History
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/trackPackage"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaSearchLocation /> Track Package
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/updateProfile"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <FaUserEdit /> Update Profile
              </NavLink>
            </li>

            {/* Admin-only links */}
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/pending-riders"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <FaUserPlus /> Pending Riders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/active-riders"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <FaUserCheck /> Active Riders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/makeAdmin"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <FaUserShield /> Make Admin
                  </NavLink>
                </li>
              </>
            )}
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
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaHome /> Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/myParcels"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaBoxOpen /> My Parcels
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaCreditCard /> Payment History
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/trackPackage"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaSearchLocation /> Track Package
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/updateProfile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserEdit /> Update Profile
                  </NavLink>
                </li>

                {role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/pending-riders"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition ${
                            isActive
                              ? "bg-blue-500 text-white shadow-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUserPlus /> Pending Riders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/active-riders"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition ${
                            isActive
                              ? "bg-blue-500 text-white shadow-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUserCheck /> Active Riders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/makeAdmin"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition ${
                            isActive
                              ? "bg-blue-500 text-white shadow-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUserShield /> Make Admin
                      </NavLink>
                    </li>
                  </>
                )}
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

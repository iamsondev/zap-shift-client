import React from "react";

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold">Welcome back 🚀</h1>
        <p className="mt-2 text-sm opacity-90">
          Here’s an overview of today’s activity in your dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Parcels</h2>
          <p className="text-3xl font-bold text-indigo-600">128</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Pending Riders</h2>
          <p className="text-3xl font-bold text-yellow-500">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Active Riders</h2>
          <p className="text-3xl font-bold text-green-500">34</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Revenue</h2>
          <p className="text-3xl font-bold text-pink-500">$12,450</p>
        </div>
      </div>

      {/* Recent Parcels */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Recent Parcels
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-200">Parcel ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-200">Sender</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-200">Receiver</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">#12345</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">John Doe</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Alice Smith</td>
                <td className="px-4 py-2 text-green-500 font-semibold">Delivered</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">#12346</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Mary Jane</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Bob Lee</td>
                <td className="px-4 py-2 text-yellow-500 font-semibold">Pending</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">#12347</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Tom Hanks</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Jerry Rice</td>
                <td className="px-4 py-2 text-red-500 font-semibold">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

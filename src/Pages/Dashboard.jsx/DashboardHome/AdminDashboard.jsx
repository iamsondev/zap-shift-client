import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBoxOpen, FaTruck, FaClock } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // assigned, in-transit, delivered, not collected

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard");
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Loading Admin Dashboard..." />;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-xl font-semibold">⚠ Failed to load dashboard data.</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );

  const pieData = [
    { name: "Assigned", value: data.parcelStatus?.assigned ?? 0 },
    { name: "In-Transit", value: data.parcelStatus?.inTransit ?? 0 },
    { name: "Delivered", value: data.parcelStatus?.delivered ?? 0 },
    { name: "Not Collected", value: data.parcelStatus?.notCollected ?? 0 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-6">
        🚀 Admin Dashboard
      </h1>

      {/* Top stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaUsers className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-2xl font-bold">{data.totalUsers}</h2>
          <p className="text-gray-500">Total Users</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaBoxOpen className="text-4xl text-purple-500 mb-3" />
          <h2 className="text-2xl font-bold">{data.totalParcels}</h2>
          <p className="text-gray-500">Total Parcels</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaClock className="text-4xl text-yellow-500 mb-3" />
          <h2 className="text-2xl font-bold">{pieData.reduce((acc, item) => acc + item.value, 0)}</h2>
          <p className="text-gray-500">Pending Parcels</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaTruck className="text-4xl text-green-500 mb-3" />
          <h2 className="text-2xl font-bold">{data.totalRiders}</h2>
          <p className="text-gray-500">Total Riders</p>
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-black shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl text-green-400 font-bold text-center mb-4">Parcel Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} parcels`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

// MyEarnings.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from "date-fns";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("overall");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["completed-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/completed-parcels");
      return res.data.parcels || [];
    },
  });

  const parcels = Array.isArray(data) ? data : [];

  const getEarning = (parcel) => {
    const sameDistrict = parcel.sender_region === parcel.receiver_region;
    return sameDistrict ? parcel.deliveryCost * 0.8 : parcel.deliveryCost * 0.3;
  };

  const filteredParcels = useMemo(() => {
    if (filter === "overall") return parcels;

    return parcels.filter((parcel) => {
      const updatedDate = parseISO(parcel.updatedAt);
      if (filter === "today") return isToday(updatedDate);
      if (filter === "week") return isThisWeek(updatedDate);
      if (filter === "month") return isThisMonth(updatedDate);
      if (filter === "year") return isThisYear(updatedDate);
      return true;
    });
  }, [filter, parcels]);

  const totalEarnings = parcels.reduce((sum, p) => sum + getEarning(p), 0);
  const totalCashedOut = parcels
    .filter((p) => p.cashedOut)
    .reduce((sum, p) => sum + getEarning(p), 0);
  const totalPending = totalEarnings - totalCashedOut;

  const handleCashout = async (parcelId) => {
    try {
      const res = await axiosSecure.patch(`/riders/cashout/${parcelId}`);
      if (res.data.success) {
        alert(`Cashed out: ৳${res.data.earning.toFixed(2)}`);
        queryClient.invalidateQueries(["completed-parcels"]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cash out");
    }
  };

  if (isLoading) return <p>⏳ Loading earnings...</p>;
  if (isError) return <p>❌ Failed to load earnings</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💰 My Earnings</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["today", "week", "month", "year", "overall"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg ${
              filter === f ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h3 className="font-semibold">Total Earnings</h3>
          <p className="text-green-600 font-bold text-xl">৳{totalEarnings.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h3 className="font-semibold">Cashed Out</h3>
          <p className="text-blue-600 font-bold text-xl">৳{totalCashedOut.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h3 className="font-semibold">Pending</h3>
          <p className="text-red-600 font-bold text-xl">৳{totalPending.toFixed(2)}</p>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Tracking ID</th>
              <th className="border px-4 py-2">Earning</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Cashed Out</th>
              <th className="border px-4 py-2">Updated</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel, idx) => (
              <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2 font-mono">{parcel.tracking_id}</td>
                <td className="border px-4 py-2 text-green-600 font-semibold">
                  ৳{getEarning(parcel).toFixed(2)}
                </td>
                <td className="border px-4 py-2 capitalize">{parcel.status}</td>
                <td className="border px-4 py-2">
                  {parcel.cashedOut ? "✅" : "❌"}
                </td>
                <td className="border px-4 py-2">
                  {parcel.updatedAt ? new Date(parcel.updatedAt).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2">
                  {!parcel.cashedOut && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleCashout(parcel._id)}
                    >
                      Cashout
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEarnings;

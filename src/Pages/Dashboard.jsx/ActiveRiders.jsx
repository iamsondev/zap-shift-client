import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch active riders
  const { isPending, data: riders = [], refetch } = useQuery({
    queryKey: ["active-riders", search],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active", {
        params: { search },
      });
      return res.data.riders || [];
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Deactivate rider
  const handleDeactivate = async (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/riders/${riderId}`, {
            status: "inactive",
          });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Riders</h1>

      {/* Search box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Bike Brand</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length > 0 ? (
              riders.map((rider) => (
                <tr key={rider._id}>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.region}</td>
                  <td>{rider.bikeBrand}</td>
                  <td className="btn mt-3 bg-green-500 hover:bg-green-700">{rider.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn bg-red-600 hover:bg-red-700"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;

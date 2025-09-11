import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  // use trastack query
  const { isPending, data: riders = [], refetch } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data.riders || []; // ✅ return array only
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }


  // Approve rider
  const handleApprove = async (riderId) => {
    try {
      const res = await axiosSecure.patch(`/riders/${riderId}`, { status: "active" });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Rider has been approved.", "success");
        refetch(); // ✅ will remove rider from table
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Cancel rider
  const handleCancel = async (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this rider's application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/riders/${riderId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Cancelled!", "Rider application has been cancelled.", "success");
            refetch(); // ✅ will remove rider from table
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Riders</h1>

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
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.bikeBrand}</td>
                <td>{rider.status}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(rider._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancel(rider._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 
                    shadow-2xl rounded-2xl w-11/12 md:w-1/2 p-6 
                    animate-[fadeIn_0.3s_ease-out]">
            {/* Header */}
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center">
              {selectedRider.name}'s Profile
            </h2>

            {/* Rider Info */}
            <ul className="space-y-3">
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Email:</span>
                <span>{selectedRider.email}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Phone:</span>
                <span>{selectedRider.phone}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Age:</span>
                <span>{selectedRider.age}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Region:</span>
                <span>{selectedRider.region}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">District:</span>
                <span>{selectedRider.district}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">NID:</span>
                <span>{selectedRider.nid}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Bike Brand:</span>
                <span>{selectedRider.bikeBrand}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Bike Reg:</span>
                <span>{selectedRider.bikeRegNumber}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-purple-600 dark:text-purple-400">Extra Info:</span>
                <span>{selectedRider.extraInfo}</span>
              </li>
            </ul>

            {/* Footer */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setSelectedRider(null)}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PendingRiders;

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedRider.name}'s Details</h2>
            <ul className="space-y-2">
              <li><strong>Email:</strong> {selectedRider.email}</li>
              <li><strong>Phone:</strong> {selectedRider.phone}</li>
              <li><strong>Age:</strong> {selectedRider.age}</li>
              <li><strong>Region:</strong> {selectedRider.region}</li>
              <li><strong>District:</strong> {selectedRider.district}</li>
              <li><strong>NID:</strong> {selectedRider.nid}</li>
              <li><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</li>
              <li><strong>Bike Registration:</strong> {selectedRider.bikeRegNumber}</li>
              <li><strong>Extra Info:</strong> {selectedRider.extraInfo}</li>
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-sm btn-ghost"
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

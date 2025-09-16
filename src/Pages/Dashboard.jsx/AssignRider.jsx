import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTrackingLogger from "../../hooks/useTrackingLogger";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure(); // should have admin JWT
  const { logTracking } = useTrackingLogger(); // hook for logging tracking events
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch pending parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "Pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?status=Pending");
      return res.data.parcels;
    },
  });

  // Fetch riders for selected parcel
  const { data: riders = [], refetch: refetchRiders } = useQuery({
    queryKey: ["riders", selectedParcel?._id],
    queryFn: async () => {
      if (!selectedParcel) return [];
      const districts = selectedParcel.receiver_service_center
        .replace(/[()]/g, "")
        .split(",")
        .map((d) => d.trim());

      let allRiders = [];
      for (let district of districts) {
        const res = await axiosSecure.get(`/riders/active?search=${district}`);
        allRiders = [...allRiders, ...res.data.riders];
      }

      return Array.from(new Map(allRiders.map(r => [r._id, r])).values());
    },
    enabled: !!selectedParcel,
  });

  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    setModalOpen(true);
  };

  const closeAssignModal = () => {
    setSelectedParcel(null);
    setModalOpen(false);
  };

  const handleAssignRider = async (rider) => {
    try {
      // Assign rider in backend
      await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
      });

      // ✅ Log tracking as admin
      await logTracking({
        tracking_id: selectedParcel.tracking_id,
        status: "assigned",
        message: `Rider ${rider.name} assigned to parcel`,
        details: { riderId: rider._id, riderEmail: rider.email },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Rider ${rider.name} assigned successfully!`,
        confirmButtonColor: "#3085d6",
      });

      closeAssignModal();
    } catch (err) {
      console.error("Assign rider error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to assign rider",
        text: err.response?.data?.message || "Something went wrong on the server",
      });
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading parcels...</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Assign Rider</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No pending parcels available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Weight</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-200">
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td>{index + 1}</td>
                  <td className="font-mono">{parcel.tracking_id}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.weight} kg</td>
                  <td>${parcel.deliveryCost}</td>
                  <td>{parcel.delivery_status}</td>
                  <td>{parcel.Payment_status}</td>
                  <td>
                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                      onClick={() => openAssignModal(parcel)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold mb-4">Assign Rider for {selectedParcel.tracking_id}</h3>
            <div className="max-h-64 overflow-y-auto">
              {riders.length === 0 ? (
                <p>No riders available in {selectedParcel.receiver_service_center}</p>
              ) : (
                riders.map((rider) => (
                  <div
                    key={rider._id}
                    className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span>{rider.name}</span>
                    <button
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                      onClick={() => handleAssignRider(rider)}
                    >
                      Assign
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              onClick={closeAssignModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;

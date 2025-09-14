import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all pending parcels assigned to the rider
  const { data: parcels = [], isLoading, error } = useQuery({
    queryKey: ["rider-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/parcels");
      return res.data.parcels;
    },
  });

  // ✅ Mutation to update parcel status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/riders/parcels/${id}/status`, { newStatus });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Parcel status updated.", "success");
      queryClient.invalidateQueries({ queryKey: ["rider-parcels"] });
    },
    onError: (err) => {
      console.error("Failed to update status:", err);
      Swal.fire("Error!", "Failed to update parcel status.", "error");
    },
  });

  const handleStatusUpdate = (parcel) => {
    let nextStatus;
    if (parcel.status === "assigned") nextStatus = "in-transit";
    else if (parcel.status === "in-transit") nextStatus = "delivered";
    else return;

    updateStatusMutation.mutate({ id: parcel._id, newStatus: nextStatus });
  };

  if (isLoading) return <p>Loading pending deliveries...</p>;
  if (error) return <p>Failed to load parcels.</p>;

  if (parcels.length === 0)
    return <p className="text-center text-xl">🎉 No pending deliveries!</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Tracking ID</th>
            <th>Receiver</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.tracking_id}</td>
              <td>{parcel.receiver_name}</td>
              <td>${parcel.deliveryCost}</td>
              <td>
                {parcel.status === "assigned" && <span className="badge badge-info">Assigned</span>}
                {parcel.status === "in-transit" && <span className="badge badge-warning">In-Transit</span>}
                {parcel.status === "delivered" && <span className="badge badge-success">Delivered</span>}
              </td>
              <td>
                {(parcel.status === "assigned" || parcel.status === "in-transit") && (
                  <button
                    onClick={() => handleStatusUpdate(parcel)}
                    className="btn btn-xs btn-primary"
                  >
                    {parcel.status === "assigned" ? "Mark Picked Up" : "Mark Delivered"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingDeliveries;

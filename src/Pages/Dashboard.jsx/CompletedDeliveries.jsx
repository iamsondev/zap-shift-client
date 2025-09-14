import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["completed-parcels"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/riders/completed-parcels");
      return data;
    },
  });

  const cashoutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const { data } = await axiosSecure.patch(`/riders/cashout/${parcelId}`);
      return data;
    },
    onSuccess: (data) => {
      toast.success(`✅ ${data.message} (+৳${data.earning.toFixed(2)})`);
      queryClient.invalidateQueries(["completed-parcels"]);
    },
    onError: () => {
      toast.error("❌ Cashout failed. Try again later.");
    },
  });

  if (isLoading) return <p>⏳ Loading completed deliveries...</p>;
  if (isError) return <p>❌ Failed to load deliveries.</p>;

  const parcels = data?.parcels || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Completed Deliveries ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <div className="p-4 text-center text-gray-600 dark:text-gray-300">
          🎉 No completed deliveries yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Tracking ID</th>
                <th className="border px-4 py-2">Receiver</th>
                <th className="border px-4 py-2">Cost</th>
                <th className="border px-4 py-2">Earning</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Updated</th>
                <th className="border px-4 py-2">Cashout</th> {/* last column */}
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => {
                const sameDistrict = parcel.sender_region === parcel.receiver_region;
                const earning = sameDistrict ? parcel.deliveryCost * 0.8 : parcel.deliveryCost * 0.3;

                return (
                  <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2 font-mono">{parcel.tracking_id}</td>
                    <td className="border px-4 py-2">{parcel.receiver_name}</td>
                    <td className="border px-4 py-2">৳{parcel.deliveryCost}</td>
                    <td className="border px-4 py-2 text-green-600 font-semibold">
                      ৳{earning.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 capitalize">{parcel.status}</td>
                    <td className="border px-4 py-2">
                      {parcel.updatedAt ? new Date(parcel.updatedAt).toLocaleString() : "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {parcel.cashedOut ? (
                        <span className="text-gray-500 text-sm">✅ Cashed Out</span>
                      ) : (
                        <button
                          onClick={() => cashoutMutation.mutate(parcel._id)}
                          disabled={cashoutMutation.isLoading}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {cashoutMutation.isLoading ? "Processing..." : "Cashout"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;

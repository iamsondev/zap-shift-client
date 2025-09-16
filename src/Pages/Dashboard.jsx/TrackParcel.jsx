import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [inputTrackingId, setInputTrackingId] = useState("");
  const [trackingId, setTrackingId] = useState("");

  // ✅ Fetch tracking history only when trackingId is set
  const { data: trackingHistory = [], isLoading, error, refetch } = useQuery({
    queryKey: ["tracking-history", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      return res.data.history;
    },
    enabled: !!trackingId,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputTrackingId.trim()) return;
    setTrackingId(inputTrackingId.trim());
    refetch();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Track Your Parcel</h1>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={inputTrackingId}
          onChange={(e) => setInputTrackingId(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Tracking Results */}
      {isLoading && <p>Loading tracking history...</p>}
      {error && <p className="text-red-500">Failed to load tracking information.</p>}

      {!isLoading && trackingId && trackingHistory.length === 0 && (
        <p className="text-center text-lg">No tracking updates found for {trackingId}</p>
      )}

      {trackingHistory.length > 0 && (
        <ul className="timeline timeline-vertical">
          {trackingHistory.map((log) => (
            <li key={log._id} className="mb-6">
              <div className="timeline-start">
                <p className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="timeline-middle">
                <span
                  className={`badge ${
                    log.status === "delivered"
                      ? "badge-success"
                      : log.status === "in-transit"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {log.status}
                </span>
              </div>
              <div className="timeline-end">
                <p className="font-semibold">{log.message}</p>

                {/* ✅ Picked Up & Delivered By */}
                {log.details?.picked_up_by && (
                  <p className="text-blue-600 text-sm">
                    Picked Up By: {log.details.picked_up_by}
                  </p>
                )}
                {log.details?.delivered_by && (
                  <p className="text-green-600 text-sm">
                    Delivered By: {log.details.delivered_by}
                  </p>
                )}

                {/* ✅ Updated By Info */}
                {log.updatedBy && (
                  <p className="text-xs text-gray-500">
                    Updated by {log.updatedBy.role} ({log.updatedBy.email})
                  </p>
                )}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackParcel;

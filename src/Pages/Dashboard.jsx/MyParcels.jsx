import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedParcel, setSelectedParcel] = useState(null); // ✅ Modal state

  const { data: parcels = [], isLoading, error, refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data.parcels;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading parcels...</p>;
  if (error) return <p>Error fetching parcels</p>;

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);
      if (res.data.success) {
        await refetch();
      } else {
        console.error("Delete failed:", res.data.message);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  const handleView = (parcel) => {
    setSelectedParcel(parcel); // ✅ Modal খুলতে parcel সেট করলাম
    document.getElementById('parcel_modal').showModal();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-6">
        <h2 className="text-2xl font-bold mb-4">
          My Parcels ({parcels.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Document</th>
                <th>Created At</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>
                    {parcel.type === "document" ? (
                      <span className="badge badge-info">Document</span>
                    ) : (
                      <span className="badge badge-secondary">No Document</span>
                    )}
                  </td>
                  <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                  <td className="font-medium text-blue-600">${parcel.deliveryCost}</td>
                  <td>
                    {parcel.Payment_status === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-error">Unpaid</span>
                    )}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleView(parcel)}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>
                    {parcel.Payment_status === "unpaid" && (
                      <button
                        onClick={() => handlePay(parcel._id)}
                        className="btn btn-xs btn-success"
                      >
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Modal Component */}
        <dialog id="parcel_modal" className="modal">
          <div className="modal-box max-w-lg bg-gradient-to-br from-base-200 via-base-100 to-base-200 rounded-2xl shadow-2xl border border-base-300">
            {selectedParcel && (
              <>
                <h3 className="text-2xl font-bold text-center text-primary mb-4">
                  📦 Parcel Details
                </h3>
                <div className="space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold text-primary">Type:</span>{" "}
                    <span className="badge badge-info">{selectedParcel.type}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-primary">Cost:</span>{" "}
                    <span className="text-xl font-bold text-green-600">
                      ${selectedParcel.deliveryCost}
                    </span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-primary">Status:</span>{" "}
                    {selectedParcel.Payment_status === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-error">Unpaid</span>
                    )}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-primary">Created:</span>{" "}
                    {new Date(selectedParcel.creation_date).toLocaleString()}
                  </p>
                </div>
              </>
            )}
            <div className="modal-action mt-6">
              <form method="dialog">
                <button className="btn btn-primary btn-wide rounded-xl shadow-lg">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyParcels;

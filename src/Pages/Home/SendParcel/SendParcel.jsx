import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

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
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Parcel Details</h3>
            {selectedParcel ? (
              <div className="space-y-2">
                <p><strong>Type:</strong> {selectedParcel.type}</p>
                <p><strong>Cost:</strong> ${selectedParcel.deliveryCost}</p>
                <p><strong>Status:</strong> {selectedParcel.Payment_status}</p>
                <p><strong>Created:</strong> {new Date(selectedParcel.creation_date).toLocaleString()}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyParcels;

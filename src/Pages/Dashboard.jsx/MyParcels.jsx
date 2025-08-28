import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, Links, Navigate, useLocation, useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
 const navigate = useNavigate();

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
    console.log("Delete API response:", res.data);

    if (res.data.success) {
      console.log("✅ Deleted, now refetching...");
      await refetch(); // force re-run query
      console.log("✅ Refetched data");
    } else {
      console.error("❌ Delete failed:", res.data.message);
    }
  } catch (err) {
    console.error("❌ Delete failed:", err);
  }
};

const handlePay = (id) => {
  console.log(id);
   navigate(`/dashboard/payment/${id}`)

}

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for small screens */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
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
                    <button className="btn btn-xs btn-info">View</button>
                    {parcel.Payment_status === "unpaid" && (
                   
                           <button onClick={()=>handlePay(parcel._id)}className="btn btn-xs btn-success">Pay</button>
                       
                    )}
                    <button onClick={() => handleDelete(parcel._id)} className="btn btn-xs btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;

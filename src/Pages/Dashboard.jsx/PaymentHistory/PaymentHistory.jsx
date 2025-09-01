import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      // Return only the array of payments
      return res.data.payments;
    },
    enabled: !!user?.email, // fetch only if email exists
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Parcel ID</th>
            <th>Tracking ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="font-mono">{payment.tranxId}</td>
                <td>{payment.parcelId}</td>
                <td>{payment.tracking_id}</td>
                <td>${payment.amount}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "succeeded"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>
                  {new Date(payment.paymentDate).toLocaleDateString()}{" "}
                  {new Date(payment.paymentDate).toLocaleTimeString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-6">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

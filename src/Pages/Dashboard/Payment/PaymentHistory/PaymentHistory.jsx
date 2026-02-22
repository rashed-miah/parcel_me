import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosInstance from "../../../../Hook/useAxiosInstance";
import useAuth from "../../../../Hook/useAuth";
import Loader from "../../../../SharedPages/Loader";
import usePageTitle from "../../../../Hook/usePageTitle";

const handleCopy = (id) => {
  navigator.clipboard.writeText(id);
  Swal.fire("Copied!", "Transaction ID copied", "success");
};

const PaymentHistory = () => {
  usePageTitle("Payment History");
  const axiosSecure = useAxiosInstance();
  const { user } = useAuth();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 mt-4">
        <table className="table table-zebra">
          <thead className="text-white bg-[#03373D] text-xs md:text-sm uppercase">
            <tr className="h-14">
              <th>#</th>
              <th>Parcel Name</th>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Card</th>
              <th>Transaction ID</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {}
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">{pay.parcelName}</td>
                <td className="font-semibold">{pay.userName}</td>

                <td className="text-green-600 font-bold">৳{pay.amount}</td>

                <td className="capitalize">{pay.paymentMethod}</td>

                <td className="uppercase">{pay.cardType}</td>

                {/* TRANSACTION ID (PARTIAL + COPY) */}
                <td>
                  <button
                    onClick={() => handleCopy(pay.transactionId)}
                    className="flex items-center gap-1 text-blue-600 hover:underline font-mono text-sm"
                  >
                    {pay.transactionId.slice(0, 6)}...
                    {pay.transactionId.slice(-4)}
                    <FaCopy />
                  </button>
                </td>

                <td className="text-sm">
                  {new Date(pay.paid_at_string).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length == 0 && (
          <div className="flex flex-col items-center justify-center  text-center p-4">
            <p className="text-gray-500 mb-2">No payment records found</p>
            <p className="text-sm text-gray-400">
              Once you complete a payment, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

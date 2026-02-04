import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosInstance from "../../../Hook/useAxiosInstance";
import {
  FaEye,
  FaTrash,
  FaMoneyCheckAlt,
  FaMapMarkedAlt,
  FaTruck,
  FaMoneyBill,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
const handleCopy = (trackingId) => {
  navigator.clipboard.writeText(trackingId);
  Swal.fire({
    icon: "success",
    title: "Copied!",
    text: "Tracking ID copied to clipboard",
    timer: 1500,
    showConfirmButton: false,
  });
};
const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  const navigate = useNavigate();

  // get data by tanstack query
  const {
    data: myParcelData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-lime-500"></span>
      </div>
    );
  }

  const handlePayment = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Parcel has been deleted.", "success");

        // 🔁 Refresh parcel list
        refetch();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to delete parcel",
        "error",
      );
    }
  };

  const totalParcels = myParcelData.length;
  const paidParcels = myParcelData.filter(
    (p) => p.paymentStatus === "paid",
  ).length;
  const unpaidParcels = totalParcels - paidParcels;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded shadow">
          <div className="stat-figure text-primary">
            <FaTruck className="text-3xl" />
          </div>
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value">{totalParcels}</div>
        </div>
        <div className="stat bg-base-200 rounded shadow">
          <div className="stat-figure text-success">
            <FaMoneyCheckAlt className="text-3xl" />
          </div>
          <div className="stat-title">Paid</div>
          <div className="stat-value text-success">{paidParcels}</div>
        </div>
        <div className="stat bg-base-200 rounded shadow">
          <div className="stat-figure text-error">
            <FaMoneyBill className="text-3xl" />
          </div>
          <div className="stat-title">Unpaid</div>
          <div className="stat-value text-error">{unpaidParcels}</div>
        </div>
      </div>

      <div className="overflow-x-auto my-8 bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Weight (kg)</th>
              <th>Tracking ID</th>
              <th>Payment</th>
              <th>Cost (৳)</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myParcelData.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>

                <td className="font-medium">{parcel.parcelName}</td>

                <td className="capitalize">{parcel.parcelType}</td>

                <td>{parcel.weight}</td>

                {/* TRACKING ID (COPYABLE) */}
                <td>
                  <button
                    onClick={() => handleCopy(parcel.trackingId)}
                    className="text-blue-600 hover:underline font-mono text-sm"
                    title="Click to copy full Tracking ID"
                  >
                    {parcel.trackingId.slice(0, 10)}
                  </button>
                </td>

                {/* PAYMENT STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      parcel.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>

                <td className="font-semibold">৳{parcel.totalCost}</td>

                <td className="text-sm">
                  {new Date(parcel.createdAt).toLocaleString()}
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex items-center justify-center gap-2">
                    {/* VIEW */}
                    <button
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      title="View"
                    >
                      <FaEye />
                    </button>

                    {/* TRACK */}
                    <button
                      className="p-2 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                      title="Track"
                    >
                      <FaMapMarkedAlt />
                    </button>

                    {/* PAY */}
                    {parcel.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayment(parcel._id)}
                        className="p-2 rounded bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition"
                        title="Pay Now"
                      >
                        <FaMoneyCheckAlt />
                      </button>
                    )}

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myParcelData.length === 0 && (
          <p className="text-center py-6 text-gray-500">No parcels found.</p>
        )}
      </div>
    </div>
  );
};
export default MyParcel;

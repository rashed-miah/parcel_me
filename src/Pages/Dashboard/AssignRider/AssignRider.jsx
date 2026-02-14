import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosInstance";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);

  /* ---------------- FETCH PARCELS ---------------- */

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?paymentStatus=paid&deliveryStatus=not-collected",
      );
      return res.data;
    },
  });

  /* ---------------- LOAD RIDERS ---------------- */

  const loadRiders = async (parcel) => {
    try {
      const res = await axiosSecure.get(
        `/riders/active-by-district?district=${parcel.senderDistrict}`,
      );

      setRiders(res.data);
      setSelectedParcel(parcel);
    } catch {
      Swal.fire("Error", "Failed to load riders", "error");
    }
  };

  /* ---------------- ASSIGN ---------------- */

  const handleAssign = async (rider) => {
    const confirm = await Swal.fire({
      title: "Assign Rider?",
      text: `${rider.name} will take this parcel`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Assign",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/parcels/assign-rider/${selectedParcel._id}`, {
        riderId: rider._id,
        riderEmail: rider.email,
      });

      Swal.fire("Success", "Rider assigned", "success");

      setSelectedParcel(null);
      setRiders([]);
      refetch();
    } catch {
      Swal.fire("Error", "Assignment failed", "error");
    }
  };

  /* ---------------- UI ---------------- */

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Assign Rider</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>District</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.trackingId}</td>
                <td>{p.senderName}</td>
                <td>{p.receiverName}</td>
                <td>{p.receiverDistrict}</td>
                <td>৳ {p.totalCost}</td>

                <td>
                  <button
                    onClick={() => loadRiders(p)}
                    className="btn btn-sm btn-primary text-black"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {selectedParcel && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-4">
              Active Riders — {selectedParcel.receiverDistrict}
            </h3>

            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Warehouse</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {riders.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.contact}</td>
                    <td>{r.warehouse}</td>

                    <td>
                      <button
                        onClick={() => handleAssign(r)}
                        className="btn btn-success btn-sm"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-action">
              <button onClick={() => setSelectedParcel(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;

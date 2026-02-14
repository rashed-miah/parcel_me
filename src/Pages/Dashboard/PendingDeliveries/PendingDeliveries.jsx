import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosInstance";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();

  /* ---------------- FETCH RIDER PENDING ---------------- */

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderPendingDeliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/pending-deliveries");
      return res.data;
    },
  });

  /* ---------------- STATUS UPDATE ---------------- */

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Mark as ${status}?`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/parcels/rider-status/${id}`, {
        status,
      });

      if (res.data.modifiedCount > 0) {
        console.log("modified data", status);
        Swal.fire("Success", "Status updated", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">My Pending Deliveries</h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking</th>
              <th>Receiver</th>
              <th>Contact</th>
              <th>District</th>
              <th>Warehouse</th>
              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.trackingId}</td>
                <td>{p.receiverName}</td>
                <td>{p.receiverContact}</td>
                <td>{p.receiverDistrict}</td>
                <td>{p.receiverWarehouse}</td>

                <td>
                  <span className="badge badge-info">{p.deliveryStatus}</span>
                </td>

                <td>
                  {/* rider_assign → pickup */}
                  {p.deliveryStatus === "rider_assign" && (
                    <button
                      onClick={() => handleStatusUpdate(p._id, "in-transit")}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Mark Picked Up
                    </button>
                  )}

                  {/* in-transit → complete */}
                  {p.deliveryStatus === "in-transit" && (
                    <button
                      onClick={() => handleStatusUpdate(p._id, "completed")}
                      className="btn btn-sm btn-success text-black"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center p-6 text-gray-500">No pending deliveries</p>
        )}
      </div>
    </div>
  );
};

export default PendingDeliveries;

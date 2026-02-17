import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosInstance";
import Loader from "../../../SharedPages/Loader";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  /* ---------------- FETCH PENDING RIDERS ---------------- */

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  /* ---------------- STATUS CHANGE FUNCTION ---------------- */

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `Rider ${status}`, "success");
        refetch();
        setSelectedRider(null);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update",
        "error",
      );
    }
  };

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return <Loader></Loader>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Pending Rider Applications</h2>

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Warehouse</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.warehouse}</td>

                <td>
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No pending riders found
          </p>
        )}
      </div>

      {/* MODAL */}

      {selectedRider && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-xl mb-3">Rider Full Information</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <b>Name:</b> {selectedRider.name}
              </p>
              <p>
                <b>Email:</b> {selectedRider.email}
              </p>
              <p>
                <b>Age:</b> {selectedRider.age}
              </p>
              <p>
                <b>Contact:</b> {selectedRider.contact}
              </p>
              <p>
                <b>NID:</b> {selectedRider.nid}
              </p>
              <p>
                <b>Region:</b> {selectedRider.region}
              </p>
              <p>
                <b>District:</b> {selectedRider.district}
              </p>
              <p>
                <b>Warehouse:</b> {selectedRider.warehouse}
              </p>
              <p>
                <b>Bike Brand:</b> {selectedRider.bikeBrand}
              </p>
              <p>
                <b>Bike Reg:</b> {selectedRider.bikeRegNumber}
              </p>
              <p>
                <b>Status:</b>
                <span className="badge badge-warning ml-2">
                  {selectedRider.status}
                </span>
              </p>
              <p>
                <b>Applied:</b> {selectedRider.created_at}
              </p>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleStatusChange(selectedRider._id, "active")}
                className="btn btn-success flex-1"
              >
                Approve Rider
              </button>

              <button
                onClick={() =>
                  handleStatusChange(selectedRider._id, "rejected")
                }
                className="btn btn-error flex-1"
              >
                Reject Rider
              </button>
            </div>

            {/* CLOSE */}

            <div className="modal-action">
              <button onClick={() => setSelectedRider(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;

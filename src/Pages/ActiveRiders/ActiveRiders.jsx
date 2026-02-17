import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosInstance";
import Loader from "../../SharedPages/Loader";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // ✅ fetch only active riders
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "active"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=active");
      return res.data;
    },
  });

  // ✅ deactivate instead of delete
  const handleDeactivate = async (id, name) => {
    const result = await Swal.fire({
      title: "Deactivate rider?",
      text: name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status: "deactivated",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Done!", "Rider deactivated", "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  // ✅ search by name
  const filtered = riders.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* search */}
      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Warehouse</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.contact}</td>
                <td>{r.region}</td>
                <td>{r.district}</td>
                <td>{r.warehouse}</td>

                <td>
                  <button
                    onClick={() => handleDeactivate(r._id, r.name)}
                    className="btn btn-error btn-sm"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;

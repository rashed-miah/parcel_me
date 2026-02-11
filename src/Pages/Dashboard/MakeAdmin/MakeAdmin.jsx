import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosInstance";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();

  /* ---------------- STATE ---------------- */
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  /* ---------------- DEBOUNCE ---------------- */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
    }, 1000);

    return () => clearTimeout(t);
  }, [search]);

  /* ---------------- FETCH USERS ---------------- */
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", debounced],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${debounced}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  /* ---------------- ROLE CHANGE ---------------- */
  const handleRoleChange = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}/role`, {
        role: newRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Role updated successfully", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update role",
        "error",
      );
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Loading */}
            {isLoading && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading users...
                </td>
              </tr>
            )}

            {/* No data */}
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {/* Users */}
            {!isLoading &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                  <td>
                    <button
                      onClick={() => handleRoleChange(user)}
                      className={`btn btn-sm text-black ${
                        user.role === "admin" ? "btn-warning" : "btn-primary"
                      }`}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
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

export default MakeAdmin;

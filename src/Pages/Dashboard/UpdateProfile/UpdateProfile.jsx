import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import useAxiosSecure from "../../../Hook/useAxiosInstance";
import useAuth from "../../../Hook/useAuth";
import usePageTitle from "../../../Hook/usePageTitle";

const UpdateProfile = () => {
  usePageTitle("Update Profile");
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  /* ---------------- GET PROFILE ---------------- */

  const {
    data: profile = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      setName(res.data.name || "");
      setPhotoURL(res.data.URL || "");
      return res.data;
    },
  });

  /* ---------------- UPDATE PROFILE ---------------- */

  const handleUpdate = async () => {
    try {
      const updateProfile = {
        displayName: name,
        URL: photoURL,
      };
      const res = await axiosSecure.patch("/users/update-profile", {
        name,
        URL: photoURL,
      });

      if (res.data.modifiedCount > 0) {
        updateUserProfile(updateProfile);
        Swal.fire("Success", "Profile updated successfully", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  /* ---------------- SKELETON UI ---------------- */

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Skeleton */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200"></div>

          {/* Form Skeleton */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>

            <div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>

            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <div className="h-12 flex-1 bg-gray-200 rounded"></div>
          <div className="h-12 flex-1 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  /* ---------------- REAL UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto mt-0 md:mt-16 bg-white p-6 md:p-10 rounded-xl shadow transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={
              photoURL ||
              user?.photoURL ||
              "https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
            }
            alt="profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-purple-500 shadow-lg object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full space-y-4">
          {/* Display Name */}
          <div>
            <label className="font-medium">Display Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-purple-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium">Profile Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-purple-400"
              value={photoURL || user?.photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-gray-600">
            <MdEmail className="text-lg text-purple-500" />
            <p>{profile.email}</p>
          </div>

          {/* Role */}
          <span className="badge text-black badge-primary px-4 py-3">
            Role: {profile.role}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          onClick={handleUpdate}
          className="btn btn-primary flex-1 text-black shadow-md"
        >
          Update Profile
        </button>

        <button className="btn btn-outline flex-1">Request Role Change</button>
      </div>
    </div>
  );
};

export default UpdateProfile;

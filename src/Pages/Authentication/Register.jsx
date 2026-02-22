import React, { useRef, useState } from "react";
import { Await, Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import usePageTitle from "../../Hook/usePageTitle";
const Register = () => {
  usePageTitle("Register");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef(null);
  const { updateUserProfile } = useAuth();
  const axiosInstance = UseAxiosPublic();

  // click circle → open file dialog
  const handleOpenFile = () => {
    fileRef.current.click();
  };
  // upload to imgbb
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`,
        formData,
      );

      setImageUrl(res.data.data.url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // remove image
  const handleRemove = () => {
    setImageUrl("");
    fileRef.current.value = "";
  };

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        // for update user profile
        const updateProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };

        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          URL: updateProfile.photoURL,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        axiosInstance.post("/users", userInfo).then((res) => {});

        updateUserProfile(updateProfile);
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  const hangleGoogle = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        const updateProfile = {
          name: user.displayName,
          photoURL: user.photoURL,
        };

        // post user data in db
        axiosInstance
          .post("/users", userInfo)
          .then((res) => console.log("userInfo", res.data));
        toast.success("Wellcome back!");
        updateUserProfile(updateProfile);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card w-full max-w-md  bg-base-100 sm:p-4 lg:p-6">
        {/* Header */}
        <h2 className="text-4xl font-extrabold  mb-2">Create an Account</h2>
        <p className=" text-gray-500 text-xl mb-6">Register with PickUp</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* upload image here */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="mb-2 pl-2">Upload image</h2>

            {/* hidden input */}
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            {/* clickable avatar */}
            <div
              onClick={handleOpenFile}
              className="w-28 h-28 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer mt-5 "
            >
              <img
                src={
                  imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="upload"
                className="w-full h-full object-cover"
              />
            </div>

            {/* remove button */}
            {imageUrl && (
              <button
                onClick={handleRemove}
                className="rounded mt-2 text-sm text-red-500 px-4 py-2 bg: bg-gray-100 hover:bg-gray-200 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Name field */}
          <div>
            <label className="label">
              <span className="label-text text-gray-700 ">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-gray-700 ">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
          {/* Password with Eye Icon */}
          <div>
            <label className="label">
              <span className="label-text  text-gray-700 ">Password</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-12"
                {...register("password", {
                  required: true,
                  minLength: 7,

                  pattern:
                    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{7,}$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  This field is requird
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be 7 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1">
                  password must be contain one uppercase letter, one lowercase
                  letter, one number, and one special character.
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary text-black w-full">Sign Up</button>
        </form>
        <p className="py-4">
          Do you hava an account ??{" "}
          <Link to="/login" className="text-green-400">
            Login here
          </Link>{" "}
        </p>
        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={hangleGoogle}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;

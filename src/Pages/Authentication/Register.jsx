import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useAuth();
  const navigate = useNavigate();
  // hook form
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("from regiser", data.email, data.password);
    createUser(data.email, data.password)
      .then(() => {
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

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card w-full max-w-md  bg-base-100 sm:p-4 lg:p-6">
        {/* Header */}
        <h2 className="text-4xl font-extrabold  mb-2">Create an Account</h2>
        <p className=" text-gray-500 text-xl mb-6">Register with PickUp</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <button className="btn btn-outline w-full flex items-center gap-2">
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

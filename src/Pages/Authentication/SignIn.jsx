import React, { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card w-full max-w-md  bg-base-100 sm:p-4 lg:p-6">
        {/* Header */}
        <h2 className="text-4xl font-extrabold  mb-2">Welcome Back</h2>
        <p className=" text-gray-500 text-xl mb-6">Login with PickUp</p>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-gray-700 ">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

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
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="" className="text-sm  text-green-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary text-black w-full">Login</button>
        </form>
        <p className="py-4">
          Don't you hava an account ??{" "}
          <Link to="/register" className="text-green-400">
            Register here
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

export default SignIn;

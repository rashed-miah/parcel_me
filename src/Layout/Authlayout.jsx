import React from "react";
import { Outlet } from "react-router";
import signAnimation from "../../src/assets/lottie/Login.json";
import Lottie from "lottie-react";
import ParcelPointLogo from "../SharedPages/ParcelPointLogo/ParcelPointLogo";
const Authlayout = () => {
  return (
    <div>
      <div className="mt-4 md:mt-6 pl-2">
        <ParcelPointLogo></ParcelPointLogo>
      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="hero-content flex flex-col  md:flex-row-reverse gap-6 w-full max-w-6xl">
          {/* Animation */}
          <div className="flex-1 flex justify-center pt-4 sm:pt-8 md:pt-14 lg:pt-20">
            <Lottie
              animationData={signAnimation}
              className="
          w-full
          max-w-xs
          sm:max-w-sm
          md:max-w-md
          
        "
            />
          </div>

          {/* Form / Outlet */}
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authlayout;

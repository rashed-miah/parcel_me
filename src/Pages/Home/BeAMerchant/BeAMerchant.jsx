import React from "react";
import merchant from "../../../assets/location-merchant.png";
const BeAMerchant = () => {
  return (
    <section className="py-4 md:py-12 bg-[url('/be-a-merchant-bg.png')] bg-no-repeat lg:py-16 bg-secondary rounded-2xl">
      <div className="px-8 md:px-16 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8  mx-auto md:mx-0">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="btn bg-primary rounded-2xl  text-[#03373D] hover:bg-[#b6d955] hover:scale-105 border-none">
                Become a Merchant
              </button>

              <button className="btn btn-outline border-primary rounded-2xl text-white hover:bg-primary hover:text-[#03373D]">
                Earn with Parcel Me Courier
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={merchant}
              alt="Be a Merchant"
              className="w-3/4 sm:w-2/3 md:w-full max-w-md "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeAMerchant;

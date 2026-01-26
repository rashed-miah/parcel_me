import React from "react";
import Navbar from "../../../SharedPages/Navbar";
import Banner from "../Bannar/Banner";
import HowItWorks from "../HowWorks/HowItWorks";
import Services from "../Services/Services";
import BrandsMarquee from "../BrandsMarquee/BrandsMarquee";
import Features from "../Features/Features";
import BeAMerchant from "../BeAMerchant/BeAMerchant";
import Reviews from "../Reviews/Reviews";
import Faq from "../FAQ/Faq";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <BrandsMarquee></BrandsMarquee>
      <Features></Features>
      <BeAMerchant></BeAMerchant>
      <Reviews></Reviews>
      <Faq></Faq>
    </div>
  );
};

export default Home;

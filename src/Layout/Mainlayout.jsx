import { Outlet } from "react-router";
import Home from "../Pages/Home/Home/Home";
import Footer from "../SharedPages/Footer";
import Navbar from "../SharedPages/Navbar";
const Mainlayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;

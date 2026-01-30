import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
const ParcelPointLogo = () => {
  return (
    <div>
      <NavLink>
        <div className="flex">
          <img
            className="w-8 h-8 md:w-8 md:h-12"
            src={logo}
            alt="logo of the delivery point"
          />
          <p className="-ml-3  font-bold md:-ml-4  text-xl md:text-3xl mt-2 md:mt-4">
            Parcel Me
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default ParcelPointLogo;

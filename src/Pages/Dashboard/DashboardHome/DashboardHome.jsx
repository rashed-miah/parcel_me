import useUserRole from "../../../Hook/useUserRole";
import Loader from "../../../SharedPages/Loader";
import Forbidden from "../../ForbiddenPage/Forbidden";
import AdminDashboard from "./AdminDashboard";
import RiderDashbord from "./RiderDashbord";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "rider") {
    return <RiderDashbord></RiderDashbord>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;

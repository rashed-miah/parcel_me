import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home/Home";
import Authlayout from "../Layout/Authlayout";
import SignIn from "../Pages/Authentication/SignIn";
import Register from "../Pages/Authentication/Register";
import CoveragePage from "../Pages/CoveragePage/CoveragePage";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SendParcel from "../SendParcel/SendParcel";
import Dashboradlayout from "../Layout/Dashboradlayout";
import MyParcel from "../Pages/Dashboard/Myparcel/MyParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        element: <CoveragePage></CoveragePage>,
        loader: () => fetch("./serviceCenters.json"),
      },
      {
        path: "sendparcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("./serviceCenters.json"),
      },
    ],
  },
  {
    path: "/",
    Component: Authlayout,
    children: [
      {
        path: "login",
        Component: SignIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboradlayout></Dashboradlayout>,
    children: [
      {
        path: "my-parcels",
        element: <MyParcel></MyParcel>,
      },
    ],
  },
]);

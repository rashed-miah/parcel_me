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
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";

import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../Routes/AdminRoute";
import Forbidden from "../Pages/ForbiddenPage/Forbidden";
import ActiveRiders from "../Pages/ActiveRiders/ActiveRiders";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import RiderRoute from "../Routes/RiderRoute";
import TrackParcel from "../Pages/TraceParcel/TraceParcel";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AboutUs from "../Pages/AboutUs/AboutUs";

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
        path: "aboutus",
        Component: AboutUs,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "be-a-rider",
        element: (
          <PrivateRoutes>
            {" "}
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
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
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-parcels",
        element: <MyParcel></MyParcel>,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "trace-parcel",
        Component: TrackParcel,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "pending-deliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "pending-riders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
]);

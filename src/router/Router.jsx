import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home/Home";
import Authlayout from "../Layout/Authlayout";
import SignIn from "../Pages/Authentication/SignIn";
import Register from "../Pages/Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
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
]);

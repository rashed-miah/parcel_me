import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./Context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-[96%] mx-auto">
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 4000, // default duration ~ 4 seconds
              style: {
                background: "#d8f45d", // your custom bg color
                color: "#000", // text color
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textAlign: "center",
              },
            },
          }}
        ></Toaster>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  </StrictMode>,
);

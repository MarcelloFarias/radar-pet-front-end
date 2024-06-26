import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/app-routes";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./contexts/user-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
      <ToastContainer />
    </NextUIProvider>
  </React.StrictMode>
);

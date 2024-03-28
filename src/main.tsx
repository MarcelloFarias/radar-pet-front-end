import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/app-routes";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <AppRoutes />
    </NextUIProvider>
  </React.StrictMode>
);

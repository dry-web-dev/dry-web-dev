import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import AppRoutes from "./app-routes";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./redux-provider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <AppRoutes />
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

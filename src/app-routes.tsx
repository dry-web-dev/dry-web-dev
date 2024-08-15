import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import NotFound from "./404";
export default function AppRoutes() {
  const element = useRoutes([
    ...routes,
    { path: "/", element: <Navigate to="/home" /> }, // Add redirect route
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  const fallback = (
    <div className="h-screen w-screen absolute top-0 flex justify-center items-center bg-black text-3xl">
      <span>Loading...</span>
    </div>
  );
  return (
    <React.Suspense fallback={fallback}>{element}</React.Suspense>
  );
}

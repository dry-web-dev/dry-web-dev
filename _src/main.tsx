import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import './index.css'
console.log(routes);
function AppRoutes() {
  const element = useRoutes([
    ...routes,
    { path: '/', element: <Navigate to="/home" /> }, // Add redirect route
  ]);
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      {element}
    </React.Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
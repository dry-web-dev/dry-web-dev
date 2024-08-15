import { useState, useEffect } from "react";
import Layout from "./layouts";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <Layout isLoading={isLoading} type="tersary">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
      </div>
    </Layout>
  )
}
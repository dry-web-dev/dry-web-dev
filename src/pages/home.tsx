import Layout from "@/layouts";
import { ContainerPrimary } from "@/styles/container/primary";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <Layout
      isLoading={isLoading}
      // type="secondary"
      // type="tersary"
    >
      <ContainerPrimary className="h-screen">
        <div className="container-primary">
          <h1>Welcome to ContainerPrimary</h1>
          <h2>About Us</h2>
          <p>
            ContainerPrimary is a leading provider of innovative solutions. Our
            mission is to deliver high-quality products that meet the needs of
            our customers.
          </p>
          <h3>Our Services</h3>
          <div>
            <p>
              We offer a wide range of services to help you achieve your goals.
              Whether you need consulting, development, or support, we have the
              expertise to assist you.
            </p>
            <p>
              Our team of experienced professionals is dedicated to providing
              exceptional service and support. We work closely with our clients
              to understand their needs and deliver customized solutions.
            </p>
          </div>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or would like to learn more about our
            services, please don't hesitate to contact us. We look forward to
            hearing from you!
          </p>
        </div>
      </ContainerPrimary>
    </Layout>
  );
}

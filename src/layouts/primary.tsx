import React from "react";
import { Spinner } from "@/styles/loading-animate/spinner";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function LayoutPrimary({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen fix bg-black top-0 z-50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
}

"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/Common/Navbar/Navbar";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section className="overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <div className="lg:grid xl:grid 2xl:grid grid-cols-12">
        <div className="hidden lg:fixed xl:fixed 2xl:fixed lg:top-[5.15rem] lg:left-0 lg:h-full lg:w-64 lg:text-white lg:flex lg:flex-col">
          <Sidebar />
        </div>
        <div className="col-span-10 lg:ml-64 w-full mt-20">{children}</div>
      </div>
    </section>
  );
}

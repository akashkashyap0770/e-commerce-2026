import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomeLayout() {
  return (
    <div className="flex flex-col items-center bg-black text-white">
      <Navbar />

      {/* 👇 Yaha child routes render honge */}
      <Outlet />
    </div>
  );
}

export default HomeLayout;

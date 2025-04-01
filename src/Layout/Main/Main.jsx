import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-baseBg">
      {/* Sidebar (Desktop View) - Fixed position */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-2/12 border-r-2 border-primary bg-baseBg z-20">
        <Sidebar />
      </div>

     

     

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-[17%] relative">

        {/* Scrollable content container */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="p-4 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;

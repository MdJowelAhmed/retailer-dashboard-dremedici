import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="grid grid-cols-12">
      {/* Sidebar (Desktop View) */}
      <div className="col-span-2 h-screen border-r-2 border-primary bg-baseBg hidden lg:block">
        <Sidebar />
      </div>

      {/* Drawer for smaller devices - now 70% width and overlays content */}
      <div
        className="lg:hidden fixed top-0 left-0 w-[70%] h-screen bg-baseBg z-50 shadow-lg transition-transform transform"
        style={{
          transform: isDrawerOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <Sidebar />
      </div>

      {/* Overlay backdrop when drawer is open */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* Main container with header - removed the conditional margin */}
      <div className="col-span-12 lg:col-span-10">
        {/* <Header /> */}

        <div className="bg-baseBg h-screen">
          <div className="overflow-y-auto rounded-md mt-12 md:mt-0 pt-6 px-4 lg:px-10">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Header with Drawer Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-baseBg h-16 flex items-center justify-between px-4 z-50">
        <button onClick={toggleDrawer} className="text-black">
          {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* <Header /> */}
      </div>
    </div>
  );
};

export default Main;

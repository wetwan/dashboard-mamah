"use client";

import React from "react";
import SideBar from "./sideBar";
import MobileSideBar from "./mobileSideBar";
import DashboardHeader from "./dashboardHeader";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex-col flex">
      <DashboardHeader />
      <div className="flex overflow-hidden flex-1">
        <div className="h-full border overflow-hidden shrink-0">
          <SideBar />
          <MobileSideBar />
        </div>
        <main className="overflow-y-auto px-4 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default ProductLayout;

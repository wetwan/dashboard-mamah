"use client";

import React from "react";
import SideBar from "./sideBar";
import MobileSideBar from "./mobileSideBar";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative">
      <div>
        <SideBar />
        <MobileSideBar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;

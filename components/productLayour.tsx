"use client";

import React from "react";
import SideBar from "./sideBar";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex border">
      <div>
        <SideBar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;

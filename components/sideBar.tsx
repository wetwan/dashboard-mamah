import React from "react";
import Logo from "./logo";
import { useSideBar } from "@/src/store/sidebarStore";
import { Sidebar, X } from "lucide-react";
import { Button } from "./ui/button";

const SideBar = () => {
  const { sideBar, toggleSideBar } = useSideBar();

  const openSidebar = sideBar === "open";
  return (
    <div
      className={`p-3 bg-green-80 h-screen flex-col items-center justify-center ${
        openSidebar ? "w-[300px] " : "w-[100px] bg-pink-00"
      }`}
    >
      <div
        className={`flex items-center p-1 ${
          openSidebar ? "justify-between" : "justify-center"
        }`}
      >
        {openSidebar && <Logo />}

        <Button
          onClick={toggleSideBar}
          variant="outline"
          className="hover:border-red-600 hover:text-red-600"
        >
          {!openSidebar ? <Sidebar size={32} /> : <X size={32} />}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;

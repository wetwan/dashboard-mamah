import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Bell, Sidebar, X } from "lucide-react";
import ThemeToggle from "./Themetoggle";
import Search from "./search";

const DashboardHeader = () => {
  const { sideBar, toggleSideBar } = useSideBar();
  const { colors } = useTheme();

  const openSidebar = sideBar === "open";
  return (
    <div className="flex items-center w-full  border justify-between lg:px-5 px-3">
      <div
        className={`flex flex-1 flex-row-reverse items-center lg:px-4 p-1 gap-10
          lg:justify-between py-5 
        `}
      >
        <Logo />

        <Button
          style={{ backgroundColor: colors.coral1 }}
          onClick={toggleSideBar}
          variant="outline"
          className=" rounded-md w-10 h-10"
        >
          {!openSidebar ? <Sidebar size={32} /> : <X size={32} />}
        </Button>
      </div>
      <div className="flex  lg:flex-1 p-1 ml-20 justify-between items-center">
        <div className="max-lg:hidden ">
          <Search />
        </div>

        <div className="flex items-center justify-center gap-6">
          {" "}
          <button
            className="p-3 rounded-full
                         
                         transition-all duration-300 transform active:scale-95 focus:outline-none"
            style={{ backgroundColor: colors.gray2 }}
          >
            <Bell className="w-5 h-5 transition-transform duration-300" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

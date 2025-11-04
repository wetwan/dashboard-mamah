import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Sidebar, X } from "lucide-react";
import ThemeToggle from "./Themetoggle";
import Search from "./search";

const DashboardHeader = () => {
  const { sideBar, toggleSideBar } = useSideBar();
  const { colors } = useTheme();

  const openSidebar = sideBar === "open";
  return (
    <div className="flex items-center w-full  border justify-between lg:px-5 px-3">
      <div
        className={`flex flex-row-reverse items-center lg:px-4 p-1 gap-10
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
        <div className="max-lg:hidden">
          <Search />
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;

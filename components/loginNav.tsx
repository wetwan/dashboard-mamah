"use client";

import React from "react";
import Logo from "./logo";
import { useTheme } from "@/src/store/themeStore";
import ThemeToggle from "./Themetoggle";

const LoginNav = () => {
  const { colors } = useTheme();
  return (
    <nav
      className="border max-w-full py-5 flex md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 justify-between items-center"
      style={{ backgroundColor: colors.gray2 }}
    >
      <Logo />
      <div className="">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default LoginNav;

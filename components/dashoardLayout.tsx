"use client";

import React from "react";
import { useTheme } from "@/src/store/themeStore";
import { getThemeColors } from "@/src/hook/theme";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <div
      className=""
      style={{
        backgroundColor: colors.background,
        color: colors.text1,
        height: '100vh'
      }}
    >
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;

"use client";

import React from "react";
import { useTheme } from "@/src/store/themeStore";
import { getThemeColors } from "@/src/hook/theme";
import OrderDetailsPage from "./orderDetailsPage";
import { useDetails } from "@/src/store/deatilsOpenStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { details } = useDetails();

  return (
    <div
      className=""
      style={{
        backgroundColor: colors.background,
        color: colors.text1,
      }}
    >
      <main>
        {details && <OrderDetailsPage />}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

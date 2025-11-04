'use client'
import { useTheme } from "@/src/store/themeStore";
import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  return <main style={{backgroundColor: colors.gray2}}>{children}</main>;
};

export default LoginLayout;

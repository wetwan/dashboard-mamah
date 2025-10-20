"use client";
import { useTheme } from "@/src/store/themeStore";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const { colors } = useTheme();

  const router = useRouter();
  return (
    <div
      style={{ color: colors.primary }}
      className="text-blue-700 flex items-center justify-center border-gray-500 uppercase text-[20px] my-2 p-4 py-2  border-2 rounded cursor-pointer tracking-wide"
      onClick={() => {
        router.push("/");
        scrollTo(0, 0);
      }}
    >
      uam closets
    </div>
  );
};

export default Logo;

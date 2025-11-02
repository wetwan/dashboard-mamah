"use client";

import React from "react";

import { useTheme } from "@/src/store/themeStore";
import { getThemeColors } from "@/src/hook/theme";
import { useSearch } from "@/src/store/searchStore";
import Search from "@/components/search";

// --- Helper Components ---

// interface ColorCardProps {
//   title: string;
//   bgClass: string;
//   textClass: string;
//   radiusClass: string;
// }

// const ColorCard: React.FC<ColorCardProps> = ({
//   title,
//   bgClass,
//   textClass,
//   radiusClass,
// }) => (
//   <div
//     className={`p-6 ${bgClass} ${textClass} ${radiusClass} shadow-md flex flex-col items-center justify-center min-h-[120px] transition-colors duration-500`}
//   >
//     <p className="text-xl font-bold">{title}</p>
//     <p className="text-sm opacity-80 mt-1">{radiusClass}</p>
//   </div>
// );

// interface ChartSwatchProps {
//   index: number;
// }

// const ChartSwatch: React.FC<ChartSwatchProps> = ({ index }) => (
//   <div
//     className={`w-full h-8 bg-chart-${index} rounded-sm transition-colors duration-500`}
//   ></div>
// );

// --- Main Component ---

const DashBoard: React.FC = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const {
    searchText,
    isSearchOpen,
    toggleSearch,
    setSearchText,
    resetSearchText,
  } = useSearch();

  return (
    <div
      // style={{ backgroundColor: colors.background }}
      className="min-h-screen  p-4 sm:p-8  text-foreground transition-colors duration-500 font-sans"
    >
      <div className="flex justify-center min-lg:hidden">
          {isSearchOpen && <Search />}
      </div>
    
    </div>
  );
};

export default DashBoard;

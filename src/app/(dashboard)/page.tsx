"use client";

import React from "react";

import { useTheme } from "@/src/store/themeStore";
import { getThemeColors } from "@/src/hook/theme";
import { useSearch } from "@/src/store/searchStore";
import Search from "@/components/search";
import { X } from "lucide-react";

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
  const { isSearchOpen, toggleSearch, searchText } = useSearch();

  return (
    <div
      // style={{ backgroundColor: colors.background }}
      className="p-2 sm:p-8  text-foreground transition-colors duration-500 font-sans"
    >
      {isSearchOpen && (
        <div
          className="flex justify-center min-lg:hidden  w-full px-3 py-6 mb-10 relative border rounded-lg "
          style={{ backgroundColor: colors.card }}
        >
          <X
            size={17}
            className="absolute top-1 right-2"
            onClick={toggleSearch}
          />
          <div className="w-full mt-3">
            <Search />
          </div>
        </div>
      )}
      <div className="">{searchText}</div>
    </div>
  );
};

export default DashBoard;

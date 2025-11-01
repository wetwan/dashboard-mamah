"use client";

import React from "react";
import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import { usePathname } from "next/navigation";
import { DollarSignIcon, HomeIcon, ListOrderedIcon } from "lucide-react";
import Link from "next/link";


const menu = [
  { name: "home", link: "/", Icon: HomeIcon },
  { name: "order", link: "/order", Icon: ListOrderedIcon },
  { name: "product", link: "/product", Icon: DollarSignIcon },
];
const MobileSideBar = () => {
  const { sideBar } = useSideBar();
  const { colors } = useTheme();
  const pathname = usePathname();

  const openSidebar = sideBar === "open";

  return (
    <div
      className={`h-screen flex flex-col items-center transition-all duration-300 lg:hidden ${
        openSidebar ? "w-[200px]" : "w-[85px]"
      }`}
    
    >
      <div className="mt-10 px-4 w-full flex-1">
        {menu.map(({ name, link, Icon }) => {
          const active = pathname === link;

          return openSidebar ? (
            <Link
              key={name}
              href={link}
              style={{
                backgroundColor: active ? colors.coral1 : colors.card,
              }}
              className="mt-3 rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize"
            >
              <Icon size={20} />
              <span>{name}</span>
            </Link>
          ) : (
            <Link
              href={link}
              key={name}
              style={{
                backgroundColor: active ? colors.coral1 : colors.card,
              }}
              className="mt-3 h-14 w-14 flex items-center justify-center rounded-lg"
            >
              <Icon size={22} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSideBar;

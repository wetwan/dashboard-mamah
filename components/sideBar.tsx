import React, { useState } from "react";
import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import { DollarSignIcon, HomeIcon, ListOrderedIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menu = [
  { name: "home", link: "/", Icon: HomeIcon },
  { name: "order", link: "/order", Icon: ListOrderedIcon },
  { name: "product", link: "/product", Icon: DollarSignIcon },
];

const SideBar = () => {
  const { sideBar } = useSideBar();
  const { colors } = useTheme();
  const pathname = usePathname();

  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const openSidebar = sideBar === "open";
  return (
    <div
      className={`h-screen flex flex-col items-center     duration-500 overflow-hidden transition-all max-lg:hidden ${
        openSidebar ? "w-[200px]" : "w-[85px]"
      }`}
    >
      <div className="mt-10 px-4 w-full flex-1">
        {menu.map(({ name, link, Icon }, i) => {
          const active = pathname === link;
          const isHovered = hoverIndex === i;

          return openSidebar ? (
            <Link
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              key={name}
              href={link}
              style={{
                backgroundColor: isHovered
                  ? colors.text3 // hovered item
                  : active
                  ? colors.coral1 // active page
                  : colors.card, // default
                transition: "background-color 0.2s ease",
              }}
              className={`mt-3 rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize`}
            >
              <Icon size={20} />
              <span
                className={`
    whitespace-nowrap transition-all duration-300
    ${openSidebar ? "opacity-100 ml-2" : "opacity-0 -ml-6"}
  `}
              >
                {name}
              </span>
            </Link>
          ) : (
            <Link
              href={link}
              key={name}
              style={{
                backgroundColor: isHovered
                  ? colors.text3 // hovered item
                  : active
                  ? colors.coral1 // active page
                  : colors.card, // default
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

export default SideBar;

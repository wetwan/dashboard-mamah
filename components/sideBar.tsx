import React from "react";
import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import {
  DollarSignIcon,
  HomeIcon,
  ListOrderedIcon,
  LogOutIcon,
  UserCircle,
} from "lucide-react";
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
      className={`flex flex-col h-screen items-center justify-between  p-2  duration-500 overflow-hidden transition-all max-lg:hidden ${
        openSidebar ? "w-[200px]" : "w-[85px]"
      }`}
    >
      <div className="border p-1 w-full">
        <div className=" px-2 py-2">
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
                className={`mt-3 rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize justify-center`}
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

      <div className="w-full">
        <div className="w-full my-4 p-1">
          {openSidebar ? (
            <div
              style={{
                backgroundColor: colors.text2, // default
                transition: "background-color 0.2s ease",
              }}
              className={`mt-3 w-5/6  mx-auto rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize`}
            >
              <UserCircle color={colors.blue1} size={20} />
              <span
                className={`
    whitespace-nowrap transition-all duration-300
    ${openSidebar ? "opacity-100 ml-2" : "opacity-0 -ml-6"}
  `}
              >
                profile
              </span>
            </div>
          ) : (
            <button
              style={{ backgroundColor: colors.text2 }}
              className="w-12 h-12 border rounded-full flex-col flex items-center justify-center mx-auto hover:bg-red-800"
            >
              <UserCircle color={colors.blue1} />
            </button>
          )}
        </div>
        <div className="mb-40 w-full ">
          {openSidebar ? (
            <div
              style={{
                backgroundColor: colors.card, // default
                transition: "background-color 0.2s ease",
              }}
              className={`mt-3 w-5/6  mx-auto rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize`}
            >
              <LogOutIcon color={colors.text2} size={20} />
              <span
                className={`
    whitespace-nowrap transition-all duration-300
    ${openSidebar ? "opacity-100 ml-2" : "opacity-0 -ml-6"}
  `}
              >
                log out
              </span>
            </div>
          ) : (
            <button
              style={{ backgroundColor: colors.text3 }}
              className="w-12 h-12 border rounded-full flex-col flex items-center justify-center mx-auto hover:bg-red-800"
            >
              <LogOutIcon color={colors.card} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

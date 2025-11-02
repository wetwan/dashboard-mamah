"use client";

import React from "react";
import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import { usePathname } from "next/navigation";
import {
  DollarSignIcon,
  HomeIcon,
  ListOrderedIcon,
  LogOutIcon,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/src/store/searchStore";

const menu = [
  { name: "home", link: "/", Icon: HomeIcon },
  { name: "order", link: "/order", Icon: ListOrderedIcon },
  { name: "product", link: "/product", Icon: DollarSignIcon },
];
const MobileSideBar = () => {
  const { sideBar } = useSideBar();
  const { colors } = useTheme();
  const pathname = usePathname();
  const { searchText, toggleSearch, setSearchText, resetSearchText } =
    useSearch();

  const openSidebar = sideBar === "open";

  return (
    <div
      className={`h-screen bg-white flex flex-col fixed top-36 items-center justify-between transition-all duration-300 lg:hidden z-40 ${
        openSidebar ? "w-[200px] absolute" : "w-[85px]"
      }`}
    >
      <div className="">
        <div className="my-10 px-4 w-full flex-1">
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
        <div className=" w-full ">
          {openSidebar ? (
            <div
              style={{
                // backgroundColor: colors.text2, // default
                transition: "background-color 0.2s ease",
              }}
              className={`w-5/6  mx-auto rounded-lg flex items-center gap-3 py-3 relative  border px-3 h-14 capitalize`}
            >
              <Search color={colors.blue1} size={20} />
              <input
                placeholder="Search"
                className=" h-full px-1 text-balance  placeholder:text-gray-600 w-5/6 outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <X
                  className="absolute text-red-800 right-4 z-50 cursor-pointer"
                  onClick={resetSearchText}
                  size={17}
                />
              )}
            </div>
          ) : (
            <button
              style={{ backgroundColor: colors.text2 }}
              className="w-12 h-12 border rounded-full flex-col flex items-center justify-center mx-auto "
              onClick={toggleSearch}
            >
              <Search color={colors.blue1} />
            </button>
          )}
        </div>
      </div>

      <div className="">
        <div className="mb-5 w-full ">
          {openSidebar ? (
            <div
              style={{
                backgroundColor: colors.text2, // default
                transition: "background-color 0.2s ease",
              }}
              className={`w-5/6  mx-auto rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize`}
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
        <div className="mb-20 w-full ">
          {openSidebar ? (
            <div
              style={{
                backgroundColor: colors.card, // default
                transition: "background-color 0.2s ease",
              }}
              className={`w-5/6  mx-auto rounded-lg flex items-center gap-3 py-3 px-3 h-14 capitalize`}
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

export default MobileSideBar;

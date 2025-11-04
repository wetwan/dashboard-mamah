"use client";

import React from "react";
import { useSideBar } from "@/src/store/sidebarStore";
import { useTheme } from "@/src/store/themeStore";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div
      className={`h-screen  flex flex-col items-center p-2 justify-between border transition-all duration-300 lg:hidden z-40 ${
        openSidebar ? "w-[200px] absolute" : "w-[85px]"
      }`}
      style={{ backgroundColor: openSidebar ? colors.background : "" }}
    >
      <div className="border p-2 w-full">
        <div className="w-full mb-5 flex-1">
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
        <div className="w-full">
          {openSidebar ? (
            <div
              style={{
                // backgroundColor: colors.text2, // default
                transition: "background-color 0.2s ease",
              }}
              className={`w-full  mx-auto rounded-lg flex items-center gap-3 py-3  border px-3 h-14 capitalize px-2`}
            >
              <Search color={colors.blue1} size={20} />
              <input
                placeholder="Search"
                className=" h-full px-1 text-balance  placeholder:text-gray-600  w-4/6 outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <X
                  className="cursor-pointer"
                  onClick={resetSearchText}
                  size={17}
                  color={colors.red1}
                />
              )}
            </div>
          ) : (
            <button
              style={{ backgroundColor: colors.text2 }}
              className="w-12 h-12 border rounded-full flex-col flex items-center justify-center mx-auto "
              onClick={() => {
                router.push("/");
                toggleSearch();
              }}
            >
              <Search color={colors.blue1} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-40 w-full">
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
        <div className="w-full ">
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

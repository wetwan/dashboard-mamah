/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/src/store/themeStore";
import React from "react";

interface sortType {
  sort: string;
  setSort: (newStatus: any) => void;
}


const SortOrder = ({ setSort, sort }: sortType) => {
  const { colors } = useTheme();
  return (
    <div className="w-full py-3 border">
      <ul className="flex min-lg:px-10 bord px-4 justify-between flex-wrap gap-5 items-center ">
        <li
          className="py-3 border lg:px-10  px-4 min-lg:w-52 md:w-24 w-[45%] text-center rounded-sm capitalize"
          style={{
            backgroundColor: colors.gray1,
            borderWidth: sort === "all" ? 2 : 0,
            borderColor: colors.gray2,
          }}
          onClick={() => setSort("all")}
        >
          all
        </li>
        <li
          className="py-3 border lg:px-10 px-4 min-lg:w-52 md:w-24 w-[45%] text-center rounded-sm capitalize"
          style={{
            backgroundColor: colors.yellow1,
            borderWidth: sort === "pending" ? 2 : 0,
            borderColor: colors.yellow2,
          }}
          onClick={() => setSort("pending")}
        >
          pending
        </li>
        <li
          className="py-3 border lg:px-10 px-4 min-lg:w-52 md:w-24 w-[45%] text-center rounded-sm capitalize"
          style={{
            backgroundColor: colors.blue1,
            borderWidth: sort === "processing" ? 2 : 0,
            borderColor: colors.blue2,
          }}
          onClick={() => setSort("processing")}
        >
          processing
        </li>
        <li
          className="py-3 border lg:px-10 px-4 min-lg:w-52 md:w-24 w-[45%] text-center rounded-sm capitalize"
          style={{
            backgroundColor: colors.green1,
            borderWidth: sort === "delivered" ? 2 : 0,
            borderColor: colors.green2,
          }}
          onClick={() => setSort("delivered")}
        >
          delivered
        </li>
        <li
          className="py-3 border lg:px-10 px-4 min-lg:w-52 md:w-24 w-[45%] text-center rounded-sm capitalize"
          style={{
            backgroundColor: colors.red1,
            borderWidth: sort === "cancelled" ? 2 : 0,
            borderColor: colors.red2,
          }}
          onClick={() => setSort("cancelled")}
        >
          cancelled
        </li>
      </ul>
    </div>
  );
};

export default SortOrder;

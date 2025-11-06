"use client";
import {
  Clock,
  Package,
  PackageMinusIcon,
  Truck,
  Workflow,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "@/src/store/themeStore";

interface StatusCounts {
  pending: number;
  processing: number;
  delivered: number;
  cancelled: number;
}

interface OrderCountProps {
  total: number | undefined;
  data: StatusCounts | undefined; // allow undefined if query isn't loaded yet
}

const OrderCount = ({ data, total }: OrderCountProps) => {
  const { colors } = useTheme();
  if (!data || !total) return null;

  return (
    <div className="flex items-center justify-start gap-6 flex-wrap w-full">
      <div
        style={{
          backgroundColor: colors.gray1,
        }}
        className="py-2 min-lg:w-1/6 md:w-2/6 w-full  shadow-xs px-3 rounded-sm gap-3 flex items-center "
      >
        <Button
          className="bg-transparent border shadow rounded-sm hover:bg-transparent"
          style={{ borderColor: colors.purple1 }}
        >
          <Package color={colors.purple1} />
        </Button>
        <div
          className=" capitalize flex flex-col gap-2 px-3 py-2"
          style={{ color: colors.text2 }}
        >
          <p className="font-light text-xs">total orders</p>
          <p className="font-bold">{total}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.gray1,
        }}
        className="py-2 shadow-xs px-3  rounded-sm gap-3 flex items-center  min-lg:w-1/6 md:w-2/6 w-full "
      >
        <Button
          className="bg-transparent border shadow rounded-sm hover:bg-transparent"
          style={{ borderColor: colors.purple1 }}
        >
          <Truck color={colors.purple1} />
        </Button>
        <div
          className=" capitalize flex flex-col gap-2 px-3 py-2"
          style={{ color: colors.text2 }}
        >
          <p className="font-light text-xs">delivered over time</p>
          <p className="font-bold">{data.delivered}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.gray1,
        }}
        className="py-2 shadow-xs px-3  rounded-sm gap-3 flex items-center  min-lg:w-1/6 md:w-2/6 w-full "
      >
        <Button
          className="bg-transparent border shadow rounded-sm hover:bg-transparent"
          style={{ borderColor: colors.purple1 }}
        >
          <PackageMinusIcon color={colors.purple1} />
        </Button>
        <div
          className=" capitalize flex flex-col gap-2 px-3 py-2"
          style={{ color: colors.text2 }}
        >
          <p className="font-light text-xs">cancelled over time</p>
          <p className="font-bold">{data.cancelled}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.gray1,
        }}
        className="py-2 shadow-xs px-3  rounded-sm gap-3 flex items-center  min-lg:w-1/6 md:w-2/6 w-full "
      >
        <Button
          className="bg-transparent border shadow rounded-sm hover:bg-transparent"
          style={{ borderColor: colors.purple1 }}
        >
          <Clock color={colors.purple1} />
        </Button>
        <div
          className=" capitalize flex flex-col gap-2 px-3 py-2"
          style={{ color: colors.text2 }}
        >
          <p className="font-light text-xs">currently pending</p>
          <p className="font-bold">{data.pending}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.gray1,
        }}
        className="py-2 shadow-xs px-3  rounded-sm gap-3 flex items-center  min-lg:w-1/6 md:w-2/6 w-full "
      >
        <Button
          className="bg-transparent border shadow rounded-sm hover:bg-transparent"
          style={{ borderColor: colors.purple1 }}
        >
          <Workflow color={colors.purple1} />
        </Button>
        <div
          className=" capitalize flex flex-col gap-2 px-3 py-2"
          style={{ color: colors.text2 }}
        >
          <p className="font-light text-xs">currently processing</p>
          <p className="font-bold">{data.processing}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCount;

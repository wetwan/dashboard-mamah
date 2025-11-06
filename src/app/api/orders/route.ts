
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { generateOrders } from "@/lib/generateOrders";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("q")?.toLowerCase().trim() || "";
  const statusFilter = searchParams.get("status")?.toLowerCase() || "all";

  const allOrders = generateOrders(500);


  let filteredOrders = allOrders;
  if (query) {
    filteredOrders = filteredOrders.filter((order) => {
      return (
        order._id.toLowerCase().includes(query) ||
        order.shippingAddress.fullName.toLowerCase().includes(query) ||
        order.shippingAddress.email.toLowerCase().includes(query)
      );
    });
  }

  // Status Filter
  if (statusFilter !== "all") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status.toLowerCase() === statusFilter
    );
  }

  // Status Counts (typed)
  const statusCounts = filteredOrders.reduce<Record<string, number>>((acc, order) => {
    const status = order.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Pagination
  const totalFiltered = filteredOrders.length;
  const totalPages = Math.ceil(totalFiltered / limit);
  const start = (page - 1) * limit;
  const orders = filteredOrders.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    total: totalFiltered,
    page,
    limit,
    totalPages,
    statusCounts,
    orders,
  });
}

export async function GETOne(req: any, { params }: { params: { id: string } }) {
  const { id } = params;

  // Generate or fetch your data source
  const allOrders = generateOrders(1000);

  // Find the order by _id
  const order = allOrders.find((o) => o._id === id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    order,
  });
}



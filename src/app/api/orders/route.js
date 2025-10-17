import { NextResponse } from "next/server";
import { generateOrders } from "@/lib/generateOrders";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const allOrders = generateOrders(1000); // 50 fake orders total
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedOrders = allOrders.slice(start, end);

  return NextResponse.json({
    total: allOrders.length,
    page,
    limit,
    totalPages: Math.ceil(allOrders.length / limit),
    orders: paginatedOrders,
  });
}

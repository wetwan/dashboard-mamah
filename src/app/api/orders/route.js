import { NextResponse } from "next/server";
import { generateOrders } from "@/lib/generateOrders";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || 10;

//   const allOrders = generateOrders(1000); // 50 fake orders total
//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const paginatedOrders = allOrders.slice(start, end);

//   return NextResponse.json({
//     total: allOrders.length,
//     page,
//     limit,
//     totalPages: Math.ceil(allOrders.length / limit),
//     orders: paginatedOrders,
//   });
// }




export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Generate all fake orders
  const allOrders = generateOrders(1000);

  // ✅ Count status totals across ALL orders
  const statusCounts = allOrders.reduce((acc, order) => {
    const status = order.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Pagination logic
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedOrders = allOrders.slice(start, end);

  return NextResponse.json({
    success: true,
    total: allOrders.length,
    page,
    limit,
    totalPages: Math.ceil(allOrders.length / limit),
    statusCounts, 
    orders: paginatedOrders,
  });
}

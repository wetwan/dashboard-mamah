import { NextResponse } from "next/server";
import { generateFakeProducts } from "@/lib/productsData";

export async function GET(req: { url: string | URL; }) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const allOrders = generateFakeProducts(1000); // 50 fake orders total
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProduct = allOrders.slice(start, end);

    return NextResponse.json({
        total: allOrders.length,
        page,
        limit,
        totalPages: Math.ceil(allOrders.length / limit),
        orders: paginatedProduct,
    });
}

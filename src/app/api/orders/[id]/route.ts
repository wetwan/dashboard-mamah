import { NextResponse } from "next/server";
import { generateOrders } from "@/lib/generateOrders";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const allOrders = generateOrders(1000);
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

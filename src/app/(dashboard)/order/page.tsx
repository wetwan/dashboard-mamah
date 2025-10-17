/* eslint-disable prefer-const */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  address1?: string;
  address2?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  status: string;
  totalPrice: number;
  items: OrderItem[];
}

interface OrdersResponse {
  orders: Order[];
  totalPages: number;
  totalCount?: number;
}

function getPageNumbers(current: number, total: number) {
  const delta = 2;
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  let lastPage: number | undefined;
  for (let i of range) {
    if (typeof i === "number" && lastPage !== undefined) {
      if (i - lastPage === 2) rangeWithDots.push(lastPage + 1);
      else if (i - lastPage > 2) rangeWithDots.push("…");
    }
    rangeWithDots.push(i);
    if (typeof i === "number") lastPage = i;
  }

  return rangeWithDots;
}

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery<OrdersResponse>({
    queryKey: ["orders", page],
    queryFn: async () => {
      const res = await fetch(`/api/orders?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    placeholderData: (prev) => prev, // ✅ replaces keepPreviousData
  });

  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading orders.</p>;
  if (!data) return null;

  const { orders, totalPages, totalCount } = data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Orders List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order: Order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">
              {order.shippingAddress.fullName}
            </h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.email}
            </p>

            <div className="mt-2">
              <p>
                Status: <span className="capitalize">{order.status}</span>
              </p>
              <p>Total: ${order.totalPrice}</p>
            </div>

            <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
              {order.items.map((item: OrderItem, idx: number) => (
                <li key={idx}>
                  {item.name} ({item.qty}x) - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center mt-6 space-y-2">
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(prev - 1, 1));
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Dynamic Page Numbers */}
            {getPageNumbers(page, totalPages).map((p, i) => (
              <PaginationItem key={i}>
                {p === "…" ? (
                  <span className="px-3 text-gray-500">…</span>
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(p as number);
                    }}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {totalCount && (
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, totalCount)} of {totalCount} results
          </p>
        )}
      </div>
    </div>
  );
}

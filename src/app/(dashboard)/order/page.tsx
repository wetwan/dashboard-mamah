"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useTheme } from "@/src/store/themeStore";
import OrderCount from "@/components/orderCount";
import SortOrder from "@/components/sortOrder";
import OrderDetailsPage from "@/components/orderDetailsPage";
import { useDetails } from "@/src/store/deatilsOpenStore";

// Types
interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  email: string;
}

interface StatusCounts {
  pending: number;
  processing: number;
  delivered: number;
  cancelled: number;
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
  statusCounts: StatusCounts;
  total: number;
}

// ✅ Columns with filterFn for global search
export const columns: ColumnDef<Order>[] = [
  {
    id: "sn",
    header: "S/N",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "_id",
    header: "Order Id",
    filterFn: "includesString",
    cell: ({ row }) => row.original._id,
  },

  {
    accessorKey: "shippingAddress.fullName",
    filterFn: "includesString",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 flex items-center gap-1 "
      >
        Customer <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="table-cell">
        {row.original.shippingAddress.fullName}
      </span>
    ),
  },
  {
    accessorKey: "shippingAddress.email",
    filterFn: "includesString",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 md:flex items-center gap-1 hidden "
      >
        Email <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="hidden md:table-cell">
        {row.original.shippingAddress.email}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.status}</span>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => row.original.items.length,
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => `$${row.original.totalPrice}`,
  },
];

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const limit = 50;
  const { colors } = useTheme();
  const { toggleDetails } = useDetails();
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError } = useQuery<OrdersResponse>({
    queryKey: ["orders", page],
    queryFn: async () => {
      const res = await fetch(`/api/orders?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to load orders");
      return res.json();
    },
    placeholderData: (prev) => prev,
  });

  const table = useReactTable({
    data: data?.orders ?? [],
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize: 70,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // ✅ enables global search
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [sortOrder, setSortorder] = useState("all");


  return (
    <>
      <div className="p-6 space-y-6">
        <div className="">
          <OrderCount data={data?.statusCounts} total={data?.total} />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: colors.text2 }}>
          Orders
        </h1>

        {/* ✅ Single global search */}
        <Input
          placeholder="Search by id, name, or email..."
          className="max-w-sm"
          disabled={isLoading}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <SortOrder sort={sortOrder} setSort={setSortorder} />
        <div className="rounded-md border">
          {isLoading && (
            <div className="p-6 text-center flex-1">Loading...</div>
          )}
          {isError && (
            <div className="p-6 text-center text-red-500">
              Error loading orders.
            </div>
          )}

          {!isLoading && !isError && data && (
            <Table
              style={{
                color: colors.text2,
                backgroundColor: colors.background,
                borderColor: colors.background,
                borderBlock: 1,
              }}
            >
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="py-4">
                    {hg.headers.map((header) => (
                      <TableHead key={header.id} className="py-4 px-3">
                        {header.isPlaceholder
                          ? null
                          : typeof header.column.columnDef.header === "function"
                          ? header.column.columnDef.header({
                              table,
                              column: header.column,
                              header,
                            })
                          : header.column.columnDef.header}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="py-4">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="py-4"
                      onClick={() => toggleDetails()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-3">
                          {typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell(cell.getContext())
                            : cell.getValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-6"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && data && (
          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-gray-600">
              Page {page} of {data.totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

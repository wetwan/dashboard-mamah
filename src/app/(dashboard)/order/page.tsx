/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
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

import { useDetails } from "@/src/store/deatilsOpenStore";
import OrderDetailsPage from "@/components/orderDetailsPage";

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
    cell: ({ row }) => row.original._id,
  },

  {
    accessorKey: "shippingAddress.fullName",
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
    cell: ({ row }) => `#${row.original.totalPrice}`,
  },
];

export default function OrdersTable() {
  const limit = 50;
  const { colors } = useTheme();
  const { toggleDetails } = useDetails();

  const [page, setPage] = useState(1);

  const [globalFilter, setGlobalFilter] = useState("");

  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [sortOrder, setSortorder] = useState("all");

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleSetSortOrder = (newStatus: any) => {
    if (newStatus !== sortOrder) {
      setSortorder(newStatus);
      setPage(1); // Reset page to 1 when status filter changes
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      // If the filter has actually changed, reset pagination before applying the filter
      if (globalFilter !== debouncedFilter) {
        setPage(1);
      }
      setDebouncedFilter(globalFilter);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [globalFilter, debouncedFilter]); // Depend on both to detect actual changes

  const { data, isLoading, isError } = useQuery<OrdersResponse>({
    queryKey: ["orders", page, debouncedFilter, sortOrder],
    queryFn: async () => {
      let url = `/api/orders?page=${page}&limit=${limit}&q=${debouncedFilter}`;

      if (sortOrder && sortOrder !== "all") {
        url += `&status=${sortOrder}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load orders");
      return res.json();
    },
    placeholderData: (prev) => prev,
  });

  console.log(data);
  const table = useReactTable({
    data: data?.orders ?? [],
    columns,
    state: {
      // globalFilter state is only for the input field, not for table logic
      // because filtering is server-side.
      pagination: {
        pageIndex: 0,
        pageSize: limit,
      },
    },
    // Removed onGlobalFilterChange and getFilteredRowModel
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const { details } = useDetails();
  const open = details === "open";

  return (
    <>
      {open && <OrderDetailsPage id={selectedOrderId} />}
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
          value={globalFilter} // Value tracks immediate input
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <SortOrder sort={sortOrder} setSort={handleSetSortOrder} />
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
                      onClick={() => {
                        setSelectedOrderId(row.original._id);
                        toggleDetails();
                      }}
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

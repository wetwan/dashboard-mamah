/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDetails } from "@/src/store/deatilsOpenStore";
import { useTheme } from "@/src/store/themeStore";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

// --- TYPES ---
interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
  cat: string;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  address1: string;
  state: string;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  createdAt: string;
  paidAt: string;
  updatedAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  status: string;
  totalPrice: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  user: string;
}
const steps: TimelineStep[] = [
  // Simplified Shipped step logic

  {
    key: "delivered",
    label: "Delivered",
    description: "Package was successfully delivered.",
    //   date: order.deliveredAt,
  },
  {
    key: "shipped",
    label: "Order Shipped",
    description: "Products are packed and on the way.",
    //   date:
    // currentStatusKey === "shipped" || isDelivered
    //   ? order.deliveredAt
    //   : null,
  },
  {
    key: "paid",
    label: "Payment Confirmed",
    description: "Payment has been successfully processed and verified.",
    //   date: order.paidAt,
  },
  {
    key: "placed",
    label: "Order Placed",
    description: "Order has been successfully placed.",
    //   date: order.createdAt,
  },
];
// --- HELPER FUNCTIONS ---

// Function to format dates into a readable string
// const formatDate = (dateString: string | null) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date);
//   } catch (error) {
//     return "Invalid Date";
//   }
// };

// Function to get the status icon and style
// const getStatusInfo = (status: string, isDelivered: boolean) => {
//   if (isDelivered) {
//     return {
//       icon: CheckCircle,
//       text: "Delivered",
//       color: "text-green-600 bg-green-100",
//     };
//   }
//   switch (status.toLowerCase()) {
//     case "processing":
//       return {
//         icon: Package,
//         text: "Processing",
//         color: "text-yellow-600 bg-yellow-100",
//       };
//     case "shipped":
//       return {
//         icon: Truck,
//         text: "Shipped",
//         color: "text-blue-600 bg-blue-100",
//       };
//     case "delivered":
//       return {
//         icon: CheckCircle,
//         text: "Delivered",
//         color: "text-green-600 bg-green-100",
//       };
//     default:
//       return {
//         icon: Clock,
//         text: "Pending",
//         color: "text-gray-600 bg-gray-100",
//       };
//   }
// };

// --- TIMELINE COMPONENT ---
interface TimelineStep {
  key: string;
  label: string;
  description: string;
  //   date: string | null;
}

const OrderDetailsPage = ({ id }: { id: string | null }) => {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<Order>({
    queryKey: ["order", id], // always include id in key
    queryFn: async () => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) throw new Error("Failed to load order");

      const data = await res.json();
      return data.order; // return the actual order object
    },
    // enabled: Boolean(id), // ensure fetch only runs when id exists
  });

  const { colors } = useTheme();
  const { toggleDetails } = useDetails();

  const isDelivered = order?.isDelivered;
  const isPaid = order?.isPaid;
  const currentStatusKey = isDelivered
    ? "delivered"
    : order?.status.toLowerCase();

  // Define all possible steps and derive their completion status

  let activeIndex = steps.findIndex((step) => step.key === currentStatusKey);
  // If delivered, mark delivered index
  if (isDelivered)
    activeIndex = steps.findIndex((step) => step.key === "delivered");
  // If not delivered but paid, mark paid index
  else if (
    isPaid &&
    activeIndex < steps.findIndex((step) => step.key === "paid")
  )
    activeIndex = steps.findIndex((step) => step.key === "paid");
  // If not paid, mark placed index
  else if (!isPaid)
    activeIndex = steps.findIndex((step) => step.key === "placed");

  // Ensure Shipped is completed if Delivered is completed
  if (activeIndex >= 3) {
    activeIndex = 3;
  } else if (currentStatusKey === "shipped") {
    activeIndex = 2;
  }

  if (!order) {
    return;
  }

  return (
    <div
      className="absolute w-full h-full z-50 "
      style={{ backgroundColor: "rgba(0,0,0,0.78)" }}
    >
      {
        <div
          className=" py-3 w-[450px]  absolute md:right-10 left-10 top-10 rounded-2xl shadow-2xl shadow-[rgba(0,0,0,0.6)]"
          style={{ backgroundColor: colors.background }}
        >
          <div className="w-full border-b flex items-center justify-between px-5 py-1">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-xl">#{order._id}</h1>
              <p className="font-medium" style={{ color: colors.text3 }}>
                Order details
              </p>
            </div>
            <div
              onClick={() => {
                toggleDetails();
              }}
              className="cursor-pointer"
            >
              <X size={16} />
            </div>
          </div>
          <div className="w-full border-b flex flex-col  px-5 py-2 pb-3">
            <p className="font-medium my-2" style={{ color: colors.text3 }}>
              {order.items.length < 2 ? "Item" : "Items"}
            </p>
            {order.items.map((item: OrderItem, i: any) => (
              <div className="flex items-center justify-between w-full" key={i}>
                <div className=" flex  gap-2 justify-center items-center">
                  <div
                    className="w-[50px] h-[50px] flex items-center justify-center rounded-md p-1"
                    style={{ backgroundColor: colors.gray1 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      aria-label={item.name}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3
                      className="font-semibold text-[12px]"
                      style={{ color: colors.text1 }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="font-semibold text-[10px] capitalize"
                      style={{ color: colors.text2 }}
                    >
                      {item.cat}
                    </p>
                  </div>
                </div>
                <div className="font-medium" style={{ color: colors.text2 }}>
                  {item.qty}pcs
                </div>
                <div className="font-medium" style={{ color: colors.text1 }}>
                  #{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-b flex flex-col  px-5 py-1">
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Created at{" "}
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                {order.createdAt &&
                  new Date(order.createdAt).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "long",
                  }) +
                    ", " +
                    new Date(order.createdAt).getFullYear()}
              </p>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Payment method
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                {order.paymentMethod}
              </p>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Status
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">{order.status}</p>
            </div>
          </div>
          <div className="w-full border-b flex flex-col  px-5 py-1">
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Customer name
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                {order.shippingAddress.fullName}
              </p>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Email
              </p>
              <a
                className="w-1/2 p-1 capitalize font-bold"
                href={`mailto:${order.shippingAddress.email}`}
                style={{ color: colors.blue1 }}
              >
                {order.shippingAddress.email}
              </a>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Phone
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>
          {/* timeline  */}
          <div className="w-full border-b flex flex-col  px-5 py-1">
            <p
              className="font-medium my-2 mb-3"
              style={{ color: colors.text3 }}
            >
              Timeline
            </p>

            <div className="relative">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <div key={step.key} className="flex relative mb-3">
                    {/* Vertical Line Connector */}
                    {index < steps.length - 1 && (
                      <div
                        className="absolute left-[15px] top-4 w-0.5 h-full"
                        style={{ backgroundColor: colors.text2 }}
                      />
                    )}

                    {/* Circle Indicator */}
                    <div
                      className={`w-5 h-5 rounded-full absolute left-2 z-10 flex items-center justify-center 
                        
                    
                        `}
                      style={{
                        backgroundColor: isActive ? colors.blue1 : colors.gray1,
                      }}
                    >
                      {!isActive ? (
                        <div className="w-3.5 h-3.5 bg-background rounded-full" />
                      ) : (
                        <div
                          className="w-2.5 h-2.5 rounded-full "
                          style={{ backgroundColor: "whitesmoke" }}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="ml-16 -mt-2 p-1">
                      <p
                        className={`font-semibold text-lg`}
                        // style={{color:
                        //  colors
                        // }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: colors.text3 }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* payment  */}
          <div className="w-full flex flex-col  px-5 py-2">
            <p className="font-medium my-2 " style={{ color: colors.text3 }}>
              Timeline
            </p>

            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Subtotal
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                ₦{order.itemsPrice.toFixed(2)}
              </p>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Shipping fee
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                ₦{order.shippingPrice.toFixed(2)}
              </p>
            </div>
            <div className="w-full flex items-center justify-start py-2 gap-2">
              <p
                className="w-1/2 p-1 font-semibold "
                style={{ color: colors.text3 }}
              >
                Total
              </p>
              <p className="w-1/2 p-1 capitalize font-bold">
                ₦{order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default OrderDetailsPage;

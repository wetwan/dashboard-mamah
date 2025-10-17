/* eslint-disable @next/next/no-img-element */
// example: app/products/page.tsx
"use client";
import { generateFakeProducts } from "@/lib/productsData";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
  const { data: products = [] } = useQuery({
    queryKey: ["fake-products"],
    queryFn: async () => {
      // simulate a short delay
      await new Promise((res) => setTimeout(res, 500));
      return generateFakeProducts(50);
    },
  });

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-3 bg-white">
          <img
            src={p.images[0]}
            alt={p.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h2 className="font-semibold mt-2 text-sm">{p.name}</h2>
          <p className="text-gray-500 text-sm">${p.finalPrice}</p>
          {p.discount > 0 && (
            <p className="text-xs text-red-500 line-through">${p.price}</p>
          )}
        </div>
      ))}
    </div>
  );
}

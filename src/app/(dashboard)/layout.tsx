import ProductLayout from "@/components/productLayour";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProductLayout>
  
    {children}</ProductLayout>;
}

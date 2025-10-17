import Logo from "@/components/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UAM closets login",
  description: "login to explore your dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" text-foreground bg-gray-900 dark:text-white transition-colors duration-300">
      <nav className="border max-w-full py-5 flex  md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 ">
        <Logo />
      </nav>
      <main>{children}</main>
    </div>
  );
}

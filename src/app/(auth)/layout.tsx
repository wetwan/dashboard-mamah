import LoginLayout from "@/components/loginLayout";
import LoginNav from "@/components/loginNav";
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
  // const {colors} = useTheme();
  return (
    <div className="transition-colors duration-300">
      <LoginNav />
      <LoginLayout>{children}</LoginLayout>
    </div>
  );
}

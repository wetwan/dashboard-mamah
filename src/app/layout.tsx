import DashboardLayout from "@/components/dashoardLayout";
import "./globals.css";

import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { ThemeProvider } from "../providers/ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

const outFitSans = Outfit({
  variable: "--font-outfit-san",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outFitSans.variable} absolute ${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 h-screen`}
      >
        <ReactQueryProvider>
          <ThemeProvider>
        
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

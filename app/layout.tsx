import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextThemeProvider from "@/components/NextThemeProvider";
import Navbar from "@/components/Navbar";
import NextUIProvider from "@/components/NextUIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevHK",
  description: "A public forum for Hong Kong Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} `}>
        <NextThemeProvider>
          <NextUIProvider>
            <Navbar />
            <div className="p-10">{children}</div>
          </NextUIProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}

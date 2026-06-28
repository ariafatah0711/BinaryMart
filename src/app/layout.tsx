import type { Metadata } from "next";
import "./globals.css";
import DBStatusIndicator from "@/components/DBStatusIndicator";

export const metadata: Metadata = {
  title: "BinaryMart - Technical Enterprise Product Catalog",
  description: "Structure Data and Algorithm Final Project - Technical product catalog optimized with BST & Quick Sort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="tech-grid min-h-screen flex flex-col justify-between">
        {children}
        <DBStatusIndicator />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";





export const metadata: Metadata = {
  title: "Packages",
  description: "Packages register page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

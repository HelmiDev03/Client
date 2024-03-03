import type { Metadata } from "next";
import { Inter } from "next/font/google";





export const metadata: Metadata = {
  title: "Register",
  description: "novencia register page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

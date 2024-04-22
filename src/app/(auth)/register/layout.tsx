import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: "Register",
  description: "novencia register page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <><div className="translate-x-[-208px] z-50 relative">
  <Toaster position="top-right"  reverseOrder={false}></Toaster>
  </div>{children}</>;
}

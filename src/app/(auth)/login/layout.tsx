import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";





export const metadata: Metadata = {
  title: "SignIn",
  description: "novencia signin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <><div className="translate-x-[-178px] z-50 relative">
  <Toaster position="top-right"  reverseOrder={false}></Toaster>
  </div>{children}</>;
}

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";


import { ChakraProvider } from '@chakra-ui/react'


export const metadata: Metadata = {
  title: "Forget Password",
  description: "ForgetPassword signin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  <ChakraProvider><div className="translate-x-[-198px] z-50 relative">
  <Toaster position="top-right"  reverseOrder={false}></Toaster>
  </div>{children}</ChakraProvider> ;
}

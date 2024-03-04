import type { Metadata } from "next";


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
  return  <ChakraProvider>{children}</ChakraProvider> ;
}

import type { Metadata } from "next";


import { ChakraProvider } from '@chakra-ui/react'


export const metadata: Metadata = {
  title: "Two Factor Authentication Page",
  description: "Two Factor Authentication page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  <ChakraProvider>{children}</ChakraProvider> ;
}

import type { Metadata } from "next";


import { ChakraProvider } from '@chakra-ui/react'


export const metadata: Metadata = {
  title: "Security",
  description: "Security page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  <ChakraProvider>{children}</ChakraProvider> ;
}

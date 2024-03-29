import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/redux/provider";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "SignIn",
  description: "novencia SignIn page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        
      <body >
      <NextTopLoader  color="#7152F3"  showSpinner={false}  speed={10}    />
      <StoreProvider>
 
      
    {children}

      </StoreProvider>
        </body>
    </html>
  );
}

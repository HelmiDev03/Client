import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/redux/provider";



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
      <StoreProvider>
 
      
    {children}

      </StoreProvider>
        </body>
    </html>
  );
}

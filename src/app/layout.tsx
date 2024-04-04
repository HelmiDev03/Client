import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/redux/provider";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "SignIn",
  description: "novencia SignIn page",
};


if(process.env.NODE_ENV == "development"){
  process.env.NEXT_PUBLIC_DOMAIN = 'http://localhost:5000';
}
else if (process.env.NODE_ENV == "production"){
  process.env.NEXT_PUBLIC_DOMAIN = 'https://clinetapi.onrender.com';
}

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

import type { Metadata } from "next";

import "./globals.css";
import StoreProvider from "@/redux/provider";
import NextTopLoader from 'nextjs-toploader';
import inDevEnvironment from "@/app/devorprod";

export const metadata: Metadata = {
  title: "SignIn",
  description: "novencia SignIn page",
};


if (inDevEnvironment) {
  console.log("in dev environment");
}
else{
  console.log("in prod mode ");
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

import type { Metadata } from "next";
import { PrimeReactProvider } from 'primereact/api';

export const metadata: Metadata = {
  title: "tree",

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <PrimeReactProvider>{children}</PrimeReactProvider>
    

      
  );
}



import { Metadata } from "next";
import Profile from '@/app/(components)/ProfileAuthLayout/Profile';



export const metadata: Metadata = {
  title: "Employee Profile",
  description: " profile page",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
   
    
  <Profile>
  {children}
</Profile> 
    
    
    
    
    );
}

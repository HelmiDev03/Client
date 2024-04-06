import React from 'react'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    
   
       
        <PrimeReactProvider value={{ unstyled:false  }}> {children} </PrimeReactProvider>
  
      
    );
  }
  
import Authprovider from "./authprovider";
import { Toaster } from "react-hot-toast";




export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {






  return (
 

      <Authprovider >
        
    
        <div className="translate-x-[-178px] z-50 relative"><Toaster position="top-right"  reverseOrder={false}></Toaster></div>
          {children}
      </Authprovider>


 

        
  );
}
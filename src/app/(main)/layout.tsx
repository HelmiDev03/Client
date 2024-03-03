import Authprovider from "./authprovider";

import SideBar from '@/app/(components)/SideBar/SideBar';
import Header from '@/app/(components)/Header/Header';




export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {






  return (
 

      <Authprovider >
        
    
          
        <div className="flex h-screen overflow-hidden">     
              
              {/* Sidebar */}
              <SideBar />
         
              {/* Main content */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">   
                  {/* Page content */}
  
                   <Header />
  
                   {children}
                  
  
                  
  
            
            </div>
          </div>
      </Authprovider>


 

        
  );
}
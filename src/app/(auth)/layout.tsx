import Authprovider from "./authprovider";





export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {






  return (
 

      <Authprovider >
        
    
      
          {children}
      </Authprovider>


 

        
  );
}
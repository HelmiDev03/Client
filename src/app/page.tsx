'use client'
import Login from "@/app/(auth)/login/page";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function Home() {
 
  const router = useRouter();
  const pathname = usePathname();
 

  const auth = useSelector((state: any) => state.auth);
if (pathname === '/' && auth.isConnected) {
  router.push('/dashboard'); // Redirect to dashboard if connected and on homepage

}
  return (
    <Login />
  
  );
}

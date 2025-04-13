'use client'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { RootState } from "@/redux/store"; 

const AuthChecker = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter()

  useEffect(() => {
    if (token) {
      try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);  

        if (decoded.exp < currentTime) {
          console.log("Token expired, redirecting...");
          router.push("/");  
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/");  
      }
    }
  }, [token, router]);

  return null; 
};

export default AuthChecker;

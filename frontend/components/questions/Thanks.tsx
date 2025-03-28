'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

interface ThanksProps {
    step: number;
  }
  

const Thanks:React.FC<ThanksProps> = ({ step })  => {
  const router = useRouter();
  console.log(step)
  setTimeout(()=>{
    router.push('/')
  },3000)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
     { step&&<div className="bg-white shadow-2xl rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Thank You! 🎉</h1>
        <p className="text-gray-600 mt-3 text-lg">
          We appreciate you choosing us. Your journey with us starts here!
        </p>
        <p className="text-gray-500 mt-1">Stay tuned for exciting updates.</p>
        
        <Button 
          className="mt-6 px-6 py-3 text-lg rounded-full"
          onClick={() => router.push("/")}
        >
          Explore More
        </Button>
      </div>}
    </div>
  );
};

export default Thanks;

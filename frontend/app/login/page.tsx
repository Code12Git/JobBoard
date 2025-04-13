'use client';

import React, { useEffect } from 'react';
import { useUser , useAuth } from '@clerk/nextjs';
import { publicInstance } from '@/helpers/axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { isLoaded, user, isSignedIn } = useUser();
  const {getToken} = useAuth();
  console.log(isLoaded,user,isSignedIn)
  // console.log(user.id)
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const fetchData = async () => {
        try {
          const token = await getToken();
    
          const response = await publicInstance.post('/auth', { clerkId: user.id, token});  
          console.log("Response:", response);
          if (response.data.statusCode === 200) {
            router.push('/questions');
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          router.push('/login');  
        }
      };
      fetchData();
    }
  }, [isLoaded, isSignedIn, user, router,getToken]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">
          Sign in to access your job board and find exciting opportunities.
        </p>
      </div>
    </div>
  );
};

export default Login;

'use client'

import AdminAnimation from "@/animations/homepage/AdminAnimation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Admin } from "@/types/auth";
import { useRouter } from "next/navigation";
import login from "@/redux/auth/action";
import toast from "react-hot-toast";
const AdminLoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const [credentials, setCredentials] = useState<Admin>({
    username: "",
    password: "",
  });
 


  const { isLoading,loginsuccess,successMessage, error } = useSelector((state: RootState) => state.auth);


  
  useEffect(() => {
    if (loginsuccess) {
      toast.success(successMessage);
      router.push("/"); 
    }
  }, [loginsuccess, successMessage, router]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     
      await dispatch(login(credentials));
    } catch (err) {
  console.log('Triggered')
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <AdminAnimation
        text="Admin Login"
        gradient="from-purple-400 via-violet-300 to-red-400"
      />

      <form onSubmit={submitHandler} className="w-full max-w-md">
        <div className="flex flex-col items-center bg-white shadow-2xl rounded-lg p-8 sm:p-10 w-full mx-auto mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Login</h2>

          {error && (
            <div className="mb-4 text-red-500 text-sm w-full">
              {error.message || "Invalid credentials"}
            </div>
          )}

          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={inputChangeHandler}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />

          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={inputChangeHandler}
            required
            className="w-full border border-gray-300 rounded-lg p-3 mt-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r cursor-pointer from-purple-400 via-violet-300 to-red-400 text-white font-medium rounded-lg p-3 mt-6 hover:opacity-90 transition-all disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;

'use client'

import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { logout } from '@/redux/auth/action'
import { useDispatch, useSelector} from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { RootState } from '@/redux/store'
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
import TemporaryDrawer from '@/animations/homepage/Drawer'
export const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const { admin,successMessage } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
      if (!admin) {
        toast.success(successMessage || "Logged out successfully");
        router.push("/adminlogin");
      }
    }, [admin, router, successMessage]);    
    const handleLogout = () => {
          dispatch(logout())  
    }
  return (
    <>
   {admin && <motion.div 
      className="p-4 bg-gradient-to-r from-red-300 via-blue-300 to-purple-300 flex items-center justify-between shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="p-2 rounded-full bg-white shadow-lg"
        >          <TemporaryDrawer />
        </motion.button>
      <motion.h1 
        className="font-bold text-xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Modern Job Board
      </motion.h1>

      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h1 className="text-gray-800 font-medium">Logged in as Admin</h1>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white shadow-lg"
        >
          <LogOut onClick={handleLogout} className="text-gray-700 cursor-pointer" />
        </motion.button>
      </motion.div>
    </motion.div>}
    </>
  )
}

'use client'
import { motion } from "motion/react"

const AdminAnimation = ({text,gradient}:{text:string,gradient:string}) => {
  return (
    <motion.h1 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    color="#4f46e5" 
transition={{
   duration: 1.5,
   scale: { type: "spring", visualDuration: 1.0, bounce: 0.8 },
}}  className={`font-bold bg-linear-to-r text-3xl ${gradient} bg-clip-text text-transparent`}>{text}</motion.h1>
  )
}

export default AdminAnimation
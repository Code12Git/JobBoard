'use client'
import PostJob from '@/components/job/hiring/PostJob'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const {user} = useAppSelector(state => state.auth)
  const router = useRouter()
  useEffect(()=>{
    if(!user || user.role !== 'employer') router.replace('/jobs')
  },[user,user?.role,router])
  return (
    <div className='container flex flex-col justify-center items-center mt-12'>
        <PostJob />
    </div>
  )
}

export default Page
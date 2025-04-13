 'use client'
 import { useAuth } from '@clerk/nextjs';
import {useRouter} from '@/hooks/index'
import { useAppSelector } from '@/hooks/useAppSelector';

interface User {
  clerkId: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string | null;
  profilePic: string;
  provider: string;
  role: string;
  token: string;
  updatedAt: string;
}

export default function Home() {
  const { isLoaded } = useAuth();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user) as User || null;

  console.log("User:",user);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of companies and candidates in the modern job board.
          </p>
          <div className="space-x-4">
            {user?.role === 'jobseeker' ? (
              <button
                onClick={() => router.push('/jobs')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Browse Jobs
              </button>
            ) : (
              <button
                onClick={() => router.push('/post-job')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                Post a Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

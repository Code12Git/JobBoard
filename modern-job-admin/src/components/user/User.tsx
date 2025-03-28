"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiClock, FiActivity, FiSearch } from "react-icons/fi";
import AvatarImage from "./image/avatarImage";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  lastLogin?: string;
  avatar?: string;
  status?: "online" | "offline" | "idle";
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLoggedInUsers = async () => {
      try {
        // Simulating API call with mock data
        const response = await new Promise<User[]>((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                role: "Admin",
                lastLogin: new Date().toISOString(),
                avatar: "https://i.pravatar.cc/150?img=1",
                status: "online",
              },
              {
                id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                role: "Developer",
                lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                avatar: "https://i.pravatar.cc/150?img=2",
                status: "idle",
              },
              {
                id: "3",
                name: "Bob Johnson",
                email: "bob@example.com",
                role: "Designer",
                lastLogin: new Date(
                  Date.now() - 1000 * 60 * 60 * 2
                ).toISOString(),
                avatar: "https://i.pravatar.cc/150?img=3",
                status: "offline",
              },
              {
                id: "4",
                name: "Alice Williams",
                email: "alice@example.com",
                role: "Manager",
                lastLogin: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                avatar: "https://i.pravatar.cc/150?img=4",
                status: "online",
              },
            ]);
          }, 800);
        });

        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
        console.error(err);
      }
    };

    fetchLoggedInUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen text-red-500"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Active Users
        </motion.h1>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-full md:w-64"
        >
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {filteredUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No users found matching your search.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="relative">
                    <AvatarImage userData={user}/>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-16 pb-6 px-4 text-center">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.role}</p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <FiMail className="text-blue-500" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FiClock className="text-blue-500" />
                      <span>
                        Last active:{" "}
                        {new Date(user.lastLogin || "").toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FiActivity className="text-blue-500" />
                      <span className="capitalize">{user.status}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md"
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Users;

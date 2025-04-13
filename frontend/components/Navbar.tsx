'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-300 via-purple-200 to-green-300 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">
            Modern Job Board
          </div>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/login" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

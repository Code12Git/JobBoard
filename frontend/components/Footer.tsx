import React from 'react';

const Footer = () => {
  return (
<footer className="bg-white h-[10vh] shadow-lg w-full">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Modern Job Board. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
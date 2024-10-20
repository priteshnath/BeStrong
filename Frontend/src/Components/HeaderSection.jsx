import React from 'react';

const HeaderSection = () => {
  return (
    <header className="bg-transparent text-white fixed top-0 w-full z-50"> {/* Added shadow for better visibility */}
      <nav className="flex items-center justify-between px-8 py-4 h-16"> {/* Set a fixed height for the navbar */}
        {/* Logo */}
        <div className="text-xl font-bold flex items-center space-x-2">
          <div className="w-4 h-4 bg-lime-500"></div>
          <span>BE STRONG</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li className="hover:text-lime-500 cursor-pointer">Home</li>
          <li className="hover:text-lime-500 cursor-pointer">Package</li>
          <li className="hover:text-lime-500 cursor-pointer">About Us</li>
          <li className="hover:text-lime-500 cursor-pointer">Contact Us</li>
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-400">
            Sign up
          </button>
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
            Log in
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;

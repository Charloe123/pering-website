'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-[#FFFDFA] h-20 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1756974823/Pering_logo_kpkkbf.png"
            alt="Logo"
            width={90}
            height={40}
            className="object-contain"
          />
        </Link>

        
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/all-post" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              ALL POST
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
            SHOP
            </Link>
          </li>
          <li>
            <Link href="/tech" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              TECHNOLOGY
            </Link>
          </li>
          <li>
            <Link href="/podcast" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              PODCAST
            </Link>
          </li>
          <li>
            <Link href="/signin" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              CREATE POST
            </Link>
          </li>
          <li>
            <Link href="/admin-panel/dashboard" className="hover:text-gray-900 text-[12px] font-semibold font-[outfit]">
              ADMIN DASHBOARD
            </Link>
          </li>
        </ul>

      
        <div className="hidden md:flex items-center space-x-3">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 hover:text-gray-900 hover:border-gray-700">
            facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 hover:text-gray-900 hover:border-gray-700">
            twitter
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 hover:text-gray-900 hover:border-gray-700">
            instagram
          </a>
        </div>

        
        <button
          className="md:hidden p-2 text-black z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col space-y-2 px-4 py-4">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/all-post" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                ALL POST
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                SHOP
              </Link>
            </li>
            <li>
              <Link href="/tech" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                TECHNOLOGY
              </Link>
            </li>
            <li>
              <Link href="/podcast" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                PODCAST
              </Link>
            </li>
            <li>
              <Link href="/signin" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                CREATE POST
              </Link>
            </li>
            <li>
              <Link href="/admin-panel/dashboard" className="text-gray-700 hover:text-gray-900 font-medium block py-1" onClick={() => setMenuOpen(false)}>
                ADMIN DASHBOARD
              </Link>
            </li>
          </ul>

        
          <div className="flex flex-col space-y-2 px-4 pb-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 text-gray-700 hover:text-gray-900 hover:border-gray-700">
              facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 text-gray-700 hover:text-gray-900 hover:border-gray-700">
              twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="border-2 rounded px-3 py-1 text-gray-700 hover:text-gray-900 hover:border-gray-700">
              instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

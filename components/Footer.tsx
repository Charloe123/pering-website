import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#FFFDFA] w-full px-6 sm:px-10 lg:px-15">
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
        <div className="mt-10 md:mt-40">
          <hr className="w-full" />
          <Image
            src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1756974823/Pering_logo_kpkkbf.png"
            alt="Logo"
            width={100}
            height={60}
            className="object-contain mt-5"
          />
          <p className="mt-6">
            Unveiling stories that intrigue and inspire, our magazine company
            offers a curated blend of captivating content. Immerse yourself in a
            world of knowledge and creativity with every page turn
          </p>
          <p className="mt-7">info@pering.com</p>
        </div>

        
        <div className="mt-10 md:mt-40">
          <hr className="w-full" />
          <h1 className="mt-6 font-semibold text-[20px]">Celebration</h1>
          <div className="flex items-center mt-3">
            <div className="bg-[#ffbd3a4b] px-4">
              <Link href="/technology" className="hover:underline text-[12px]">
                BUSINESS
              </Link>
            </div>
            <div className="flex-1 h-px bg-black ml-1"></div>
            <p className="text-[12px]">SEP 12, 2023</p>
            <hr className="w-4" />
          </div>
          <div className="mt-5">
            <h4 className="font-semibold text-[20px]">
              The Importance of Corporate Social Responsibility
            </h4>
            <div className="flex items-center mt-3">
              <div className="bg-[#ffbd3a4b] px-4">
                <Link href="/technology" className="hover:underline text-[12px]">
                  TECHNOLOGY
                </Link>
              </div>
              <div className="flex-1 h-px bg-black ml-1"></div>
              <p className="text-[12px]">SEP 12, 2023</p>
              <hr className="w-4" />
            </div>
          </div>
          <h5 className="font-semibold text-[20px] mt-3">
            Self-Driving Cars: Everything You Need to Know
          </h5>
        </div>

       
        <div className="mt-10 md:mt-40">
          <hr className="w-full" />
          <h2 className="mt-6 text-[20px] font-semibold">Newsletter</h2>
          <p className="mt-4">Join 89,000 subscribers!</p>
          <form action="">
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded transition mt-8"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      
      <hr className="mt-10 border-t border-black" />
      <p className="mt-12 text-center md:text-left">
        © 2025 Pering. Theme by Marcframe.
      </p>
    </div>
  );
}

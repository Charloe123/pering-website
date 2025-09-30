import React from "react";
import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="md:mt-32 w-full overflow-hidden mt-[1000px]">
      <div className="max-w-[1260px] sm:px-6 md:mx-auto mx-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
          <div className="w-full">
            <Image
              src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1756974823/Pering_logo_kpkkbf.png"
              alt="Logo"
              width={130}
              height={40}
              className="object-contain"
            />
            <hr className="w-full mt-6 border-black" />
            <div className="mt-10">
              <h2 className="md:text-2xl font-bold text-[18px]">
                Sign Up For Our Newsletters Get Notified Of The Best Deals On
                Our Bloggers Themes.
              </h2>
            </div>
            <form className="mt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-200 rounded focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white rounded transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          
          <div className="w-full relative h-[400px] sm:h-[500px] md:h-[340px]">
            <Image
              src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1757318299/A9uTnHC8XXRRzWiOvYHZwAQ4w_1_bgq4b2.jpg"
              alt="Newsletter Visual"
              fill
              className="object-cover "
            />
          </div>
        </div>
        <hr className="mt-12 border-t border-black" />
      </div>
    </section>
  );
}

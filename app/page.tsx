import Image from "next/image";

import Link from "next/link";
import Cards from "@/components/Cards";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
import DailyInspiration from "@/components/dailyInspiration";
import MotivationSection from "@/components/MotivationSection";


export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden bg-[#FFFDFA] w-full ">
        <div className="w-full  pt-20 px-4 sm:px-8 md:px-16 ">
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 ">
            <div className="relative w-full md:w-[520px] h-[800px] sm:h-[400px] md:h-[600px]">
              <Link href={"/"}>
                <Image
                  src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1756900147/B6H8uMrvXJMcE3bXXnTeFhxAQ8_xkhjyu.jpg"
                  alt="hello"
                  fill
                  className="object-cover "
                />
              </Link>
            </div>

            <div className="w-full md:w-[850px] pr-0 md:pr-7">
              <Link href="/" className="group">
                <h1 className="text-[22px] sm:text-[28px] md:text-[28px] lg:text-5xl hover:underline tracking-tight relative inline-block cursor-pointer font-[outfit]">
                  The Rise of Fashion Blogging:The <br />
                  Role of Influencers in the Industry
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full"></span>
                </h1>
              </Link>

              <h2 className="mt-5 font-[outfit] text-sm sm:text-base">
                CERIDWEN / WRITER - FASHION - SEP 2, 2023
              </h2>

              <p className="mt-6 font-[outfit]  text-[18px]">
                Style is the only thing you cannot buy It is not a shopping bag,
                a label, or a price tag. it is something reflected from our soul
                to the outside world, an imotion.
              </p>

              <div className="border-b-1 mt-8"></div>

              <div className="max-w-7xl py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="bg-[#ffbd3a4b] px-4 ">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          BUSINESS
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 12, 2023</p>
                      <hr className="w-4" />
                    </div>

                    <div>
                      <h1 className="hover:underline text-[18px] font-semibold">
                        {" "}
                        <Link href="/">
                          The Importance of <br /> Corporate Social
                        </Link>
                      </h1>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="px-2 rounded-md">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          <h1 className="bg-[#ffbd3a4b] py-1">TECHNOLOGY</h1>
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 10, 2023</p>
                      <hr className="w-4" />
                    </div>

                    <div>
                      <h3 className="hover:underline text-[19px] font-semibold">
                        <Link href="/">
                          Self-Driving Cars: <br />
                          Everything You Need to
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="bg-[#ffbd3a4b] px-2">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          FASHION
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 10, 2023</p>
                      <hr className="w-4" />
                    </div>
                    <div>
                      <h4 className="hover:underline text-[19px] font-semibold">
                        <Link href={"/"}>
                          Fashion and Celebrity <br /> Culture:The Influence
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="bg-[#ffbd3a4b]  ">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          TECHNOLOGY
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 12, 2023</p>
                      <hr className="w-4" />
                    </div>

                    <div>
                      <h1 className="hover:underline text-[19px] font-semibold">
                        {" "}
                        <Link href="/">
                          Global Chip shortage to <br /> Hurt Computer Firms
                        </Link>
                      </h1>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="px-2 rounded-md">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          <h1 className="bg-[#ffbd3a4b] px-4 py-1">BUSINESS</h1>
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 10, 2023</p>
                      <hr className="w-4" />
                    </div>

                    <div>
                      <h3 className="hover:underline text-[19px] font-semibold">
                        <Link href="/">
                          The Role of Purpose in <br />
                          Business: Building a
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="bg-[#ffbd3a4b] px-4">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          FASHION
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1"></div>
                      <p className="text-[12px]">SEP 10, 2023</p>
                      <hr className="w-4" />
                    </div>
                    <div>
                      <h4 className="hover:underline text-[19px] font-semibold">
                        <Link href={"/"}>
                          The Importance of Fit in <br /> Fashion: Balancing
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh] mt-10 border-b border-px w-[100%] "></div>
        </div>

        <div className="h-[90vh] mt-10 w-full">
          <h1 className="text-4xl px-14"></h1>
          <Cards />
        </div>
        <div className="mt-20">
          <SecondSection />
        </div>

        <div>
          <ThirdSection />
        </div>

        <div>
          <DailyInspiration />
        </div>

        <div >
         <MotivationSection />
        </div>
      </main>
    </>
  );
}

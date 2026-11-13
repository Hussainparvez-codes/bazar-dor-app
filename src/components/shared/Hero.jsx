"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setToday(date);
  }, []);

  return (
    <section className="bg-[#F0F6F1] px-4 py-3 sm:px-6 sm:py-8" >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-5 rounded-2xl border border-[#E4EDE5] bg-[#FAFCFA] px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-7">

          {/* Left Content */}
          <div className="space-y-3">

            {/* Date Badge */}
            <span className="inline-flex rounded-full bg-[#E7F5EA] px-3 py-1 text-xs font-medium text-[#05893E]">
              {today || " "}
            </span>

            {/* Heading */}
            <h1 className="text-2xl font-bold leading-tight text-[#1D271F] sm:text-3xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <Link
              href="#all-products"
              className="inline-flex rounded-md bg-[#05893E] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#047333]"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-end sm:pr-4">
            <Image
              src="/assets/bazar-hero.png"
              alt="বাজারের পণ্য"
              width={350}
              height={250}
              priority
              className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব পণ্য", slug: "", icon: "🛒" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫒" },
   { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🥩" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "moshla", icon: "🌶️" },
];

// Category Navigation
function CategoryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
        {categories.map((category) => {
          const categoryHref = category.slug
            ? `/category/${category.slug}`
            : "/";

          const isActive = category.slug
            ? pathname === categoryHref ||
              pathname.startsWith(`${categoryHref}/`)
            : pathname === "/";

          return (
            <Link
              key={category.slug || "all"}
              href={categoryHref}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#05893E] text-white"
                  : "text-[#1D271F] hover:bg-green-50 hover:text-[#05893E]"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Navbar() {
  const router = useRouter();

  const [today, setToday] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error(error);
        setIsSigningOut(false);
        return;
      }

      setIsProfileOpen(false);
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E] p-2">
            <Image
              src="/assets/logo-icon.png"
              alt="BazarDor logo"
              width={26}
              height={26}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight text-[#05893E]">
              বাজার দর
            </span>

            <span className="mt-0.5 text-[11px] leading-tight text-gray-500">
              {today || " "}
            </span>
          </div>
        </Link>

        {/* Authentication / Profile */}
        <div className="relative">
          {!isPending && user ? (
            <>
              {/* Profile Toggle */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5EC] font-bold text-[#05893E]">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <span className="hidden text-sm font-semibold text-[#1D271F] sm:block">
                  {user.name || "User"}
                </span>

                <span className="text-xs text-gray-500">
                  {isProfileOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-[60] mt-3 w-[280px] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                  {/* User Information */}
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="truncate text-sm font-bold text-[#1D271F]">
                      {user.name}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-3 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#1D271F] transition hover:bg-green-50 hover:text-[#05893E]"
                  >
                    <span>👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <span>↪</span>
                    <span>
                      {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </span>
                  </button>
                </div>
              )}
               </>
              ) : !isPending ? ( 
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Sign In - No Background */}
                   <Link
                   href="/sign-in"
                    className="text-sm font-semibold text-[#1D271F] transition hover:text-[#05893E]"
                    >
                    Sign In
                    </Link>
                    {/* Sign Up - Green Background */}
                    <Link
                    href="/sign-up"
                     className="rounded-lg bg-[#05893E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#047535]"
                    >
                    Sign Up
                    </Link>
                </div>
          ) : null}
        </div>
      </div>

      {/* Category Navigation with Suspense */}
      <Suspense
        fallback={
          <div className="h-10 border-t border-gray-100" />
        }
      >
        <CategoryNavigation />
      </Suspense>
    </header>
  );
}

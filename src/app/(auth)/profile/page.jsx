"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = session?.user;

  // Load user information
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
      });

      if (error) {
        setError(error.message || "Profile Update করা যায়নি।");
        return;
      }

      setMessage("আপনার Profile সফলভাবে Update হয়েছে!");
    } catch (err) {
      console.error(err);
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setError(error.message || "Sign Out করা যায়নি।");
        setIsSigningOut(false);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Sign Out করতে সমস্যা হয়েছে।");
      setIsSigningOut(false);
    }
  };

  // Loading
  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F7F2]">
        <p className="text-sm text-gray-500">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F7F2]">

      <main className="mx-auto max-w-3xl px-4 py-10">

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#1D271F]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং পরিবর্তন করুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            {/* User Information */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E8F5EC] text-2xl font-bold text-[#05893E]">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-[#1D271F]">
                  {user.name}
                </h2>

                <p className="truncate text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <Button
              type="button"
              isDisabled={isSigningOut}
              onPress={handleSignOut}
              className="rounded-lg border border-red-200 bg-white px-5 py-2 font-semibold text-red-600 hover:bg-red-50"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-bold text-[#1D271F]">
            Profile Information
          </h2>

          <form onSubmit={handleUpdate} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1D271F]">
                আপনার নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#05893E]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1D271F]">
                Gmail / Email Address
              </label>

              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
              />

              <p className="mt-1 text-xs text-gray-400">
                আপনার অ্যাকাউন্টের Email Address।
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1D271F]">
                মোবাইল নম্বর
              </label>

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#05893E]"
              />
            </div>

            {/* Success Message */}
            {message && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Update Button */}
            <Button
              type="submit"
              isDisabled={isLoading || isSigningOut}
              className="w-full rounded-lg bg-[#05893E] py-3 font-semibold text-white hover:bg-[#047333]"
            >
              {isLoading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </Button>

          </form>
        </div>
      </main>
    </div>
  );
}
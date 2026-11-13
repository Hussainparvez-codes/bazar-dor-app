"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAnyLoading =
    isLoading || isGoogleLoading || isGithubLoading;

  // Email and Password Sign In
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    // Validation
    if (!email || !password) {
      const message = "Email এবং Password পূরণ করুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      const message = "সঠিক Email Address লিখুন।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const message =
          error.message || "Email অথবা Password সঠিক নয়।";

        setErrorMessage(message);
        toast.error(message);
        return;
      }

      if (data) {
        toast.success("সফলভাবে Login হয়েছে!");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign In Error:", error);

      const message = "Login করা সম্ভব হয়নি। আবার চেষ্টা করুন।";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        const message =
          error.message || "Google Sign In ব্যর্থ হয়েছে।";

        setErrorMessage(message);
        toast.error(message);
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);

      const message = "Google দিয়ে Sign In করা সম্ভব হয়নি।";

      setErrorMessage(message);
      toast.error(message);
      setIsGoogleLoading(false);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setErrorMessage("");
    setIsGithubLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        const message =
          error.message || "GitHub Sign In ব্যর্থ হয়েছে।";

        setErrorMessage(message);
        toast.error(message);
        setIsGithubLoading(false);
      }
    } catch (error) {
      console.error("GitHub Sign In Error:", error);

      const message = "GitHub দিয়ে Sign In করা সম্ভব হয়নি।";

      setErrorMessage(message);
      toast.error(message);
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F7F2]">
      <main className="flex min-h-[calc(100vh-110px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-[370px] rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-[#1D271F]">
              স্বাগতম!
            </h1>

            <p className="mt-2 text-xs text-gray-500">
              আপনার অ্যাকাউন্টে প্রবেশ করুন।
            </p>
          </div>

          {/* Sign In Form */}
          <Form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-4"
          >
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="w-full"
              validate={(value) => {
                if (!value) {
                  return "Email লিখুন।";
                }

                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "সঠিক Email Address লিখুন।";
                }

                return null;
              }}
            >
              <Label>ইমেইল</Label>

              <Input
                placeholder="you@example.com"
                className="w-full"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type="password"
              isRequired
              className="w-full"
              validate={(value) => {
                if (!value) {
                  return "Password লিখুন।";
                }

                return null;
              }}
            >
              <Label>পাসওয়ার্ড</Label>

              <Input
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="w-full"
              />

              <FieldError />
            </TextField>

            {/* Error Message */}
            {errorMessage && (
              <p className="w-full rounded-md bg-red-50 p-2 text-xs text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              isDisabled={isAnyLoading}
              className="w-full rounded-md bg-[#05893E] py-2.5 font-semibold text-white hover:bg-[#047333]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  প্রবেশ করা হচ্ছে...
                </span>
              ) : (
                "সাইন ইন করুন"
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isAnyLoading}
              onPress={handleGoogleSignIn}
              className="flex h-11 items-center justify-center gap-2 border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              {isGoogleLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              ) : (
                <>
                  <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.36 5.71c4.3-3.96 7.41-9.8 7.41-17.36Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.54 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.36-5.71c-2.04 1.37-4.65 2.18-8.55 2.18-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isAnyLoading}
              onPress={handleGithubSignIn}
              className="flex h-11 items-center justify-center gap-2 border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              {isGithubLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-[#181717]"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>

                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
          </div>
          {/* Sign Up Link */}
          <p className="mt-5 text-center text-xs text-gray-500">
            নতুন ব্যবহারকারী?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#05893E] hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
                            {/* Home Page Link */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-[#05893E] hover:underline"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

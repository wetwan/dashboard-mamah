"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-md px-6 py-10">
        <form className="border shadow-lg rounded-lg p-8 flex flex-col items-center bg-white dark:bg-gray-800 transition-colors duration-300">
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
            sign in
          </h1>

          <div className="w-full mb-5">
            <div className="flex items-center gap-3 px-3 py-4 w-full bg-gray-200 dark:bg-gray-700 border rounded focus-within:ring-2 focus-within:ring-[#7971ea]">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-300"
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <div className="flex items-center gap-3 px-3 py-4 w-full bg-gray-200 dark:bg-gray-700 border rounded focus-within:ring-2 focus-within:ring-[#7971ea]">
              <Lock size={20} />
              <input
                type={passwordShow ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setPasswordShow((prev) => !prev)}
                className="focus:outline-none"
              >
                {passwordShow ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full py-4 mt-4 bg-[#7971ea] text-white font-bold text-lg rounded hover:bg-white hover:text-[#7971ea] hover:border hover:border-[#7971ea] transition-colors duration-300 capitalize">
            sign up
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Not a user yet?{" "}
            <Link href="/login" className="text-[#7971ea] font-medium">
              login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

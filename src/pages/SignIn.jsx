import React from "react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-6">
      <div className="w-full max-w-sm sm:max-w-md rounded-lg bg-white p-5 sm:p-8 shadow-md dark:bg-gray-800">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">Sign In</h1>

        <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
          <input
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 text-sm sm:text-base"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 sm:px-4 sm:py-3 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 text-sm sm:text-base"
            placeholder="Password"
            type="password"
          />
          <button
            type="button"
            className="w-full rounded-lg bg-blue-500 px-3 py-2.5 sm:px-4 sm:py-3 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            Sign In
          </button>
        </div>

        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:px-4 sm:py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 text-sm sm:text-base"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}


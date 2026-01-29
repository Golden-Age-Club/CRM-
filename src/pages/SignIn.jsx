import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Auth is not wired yet — this is a placeholder screen.
      </p>

      <div className="mt-6 space-y-3">
        <input
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          placeholder="Email"
        />
        <input
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          placeholder="Password"
          type="password"
        />
        <button
          type="button"
          className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600"
        >
          Sign In
        </button>
      </div>

      <Link to="/" className="mt-6 inline-flex text-sm font-medium text-orange-600 hover:text-orange-700">
        Back to Dashboard
      </Link>
    </div>
  );
}


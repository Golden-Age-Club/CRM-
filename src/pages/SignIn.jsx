import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
    }
    // If success, navigation happens in login function
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('auth.sign_in')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t('auth.welcome_back')}</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
              placeholder={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
              placeholder={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? t('auth.signing_in') : t('auth.sign_in')}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin-panel"); // ✅ Redirect to admin panel on success
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleBack = () => {
    router.push("/"); // Redirect to the admin panel
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl">
        {/* ✅ Image Section */}
        <div className="hidden md:block w-1/2 bg-blue-500">
          <Image
            src="/image2.png" // ➡️ Replace with your image path
            alt="Login" width={500} height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Admin ID */}
            <div>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Admin ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full mt-4 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

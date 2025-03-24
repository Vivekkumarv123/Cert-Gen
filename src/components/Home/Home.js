"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleViewCertificate = () => {
    router.push("/certificate/verify"); // ✅ Direct to certificate page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Certificate Generator
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Please login to access the admin panel and generate certificates.
        </p>

        {/* ✅ Login Button */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>

          {/* ✅ View Certificate Button */}
          <button
            onClick={handleViewCertificate}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

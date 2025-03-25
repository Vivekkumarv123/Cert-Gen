"use client";

import { useState } from "react";
import Image from "next/image"; // Correct import for Image component

export default function ViewCertificatePage() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  const handleFetchCertificate = async () => {
    setError("");
    setCertificate(null);

    try {
      const res = await fetch(`/api/certificate/verify/${certificateId}`);

      if (!res.ok) {
        throw new Error("Certificate not found");
      }

      const data = await res.json();
      setCertificate(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the certificate.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md sm:max-w-lg lg:max-w-4xl">
        {/* ✅ Title */}
        <h2 className="text-2xl font-bold mb-4 text-center md:text-3xl">
          View Certificate
        </h2>

        {/* ✅ Input Field */}
        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Enter Certificate ID"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
        />

        {/* ✅ Submit Button */}
        <button
          onClick={handleFetchCertificate}
          className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 ${
            !certificateId ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!certificateId}
        >
          Fetch Certificate
        </button>

        {/* ✅ Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {/* ✅ Display Certificate */}
        {certificate && (
          <div className="flex-1 p-8 mt-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 border-b-2 pb-4">
              Certificate of Completion
            </h1>
            <div className="text-center space-y-6">
              <p className="text-xl md:text-2xl">
                This is to certify that{" "}
                <span className="font-bold text-2xl">{certificate.recipientName || "N/A"}</span>
              </p>
              <p className="text-xl md:text-2xl">
                has successfully completed the{" "}
                <span className="font-bold">{certificate.internshipType || "N/A"}</span> in
              </p>
              <p className="text-3xl font-bold text-blue-600">{certificate.courseName || "N/A"}</p>
              <div className="mt-8">
                <p className="text-lg md:text-xl">Completed on</p>
                <p className="text-xl md:text-2xl font-semibold">
                  {certificate.date
                    ? new Date(certificate.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
              <div className="mt-12 flex justify-between items-center px-8 md:px-12">
                {/* ✅ Signature */}
                <div className="text-left">
                  <div className="border-b-2 border-black w-32 mt-2">
                    <Image
                      src="/sign.png"
                      alt="Signature"
                      width={1000}
                      height={1000}
                      className="w-[100px] h-[50px]"
                    />
                  </div>
                  <p className="text-sm mt-2">Authorized Signature</p>
                </div>
                {/* ✅ Certificate ID */}
                <div className="text-right">
                  <p className="text-sm">Certificate ID:</p>
                  <p className="font-mono">{certificateId || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* ✅ Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
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
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">
              Certificate for {certificate.recipientName || "N/A"}
            </h3>
            <p className="text-gray-600">
              Course: {certificate.courseName || "N/A"}
            </p>
            <p className="text-gray-600">
              Internship Type: {certificate.internshipType || "N/A"}
            </p>
            <p className="text-gray-600">
              Issued on:{" "}
              {certificate.date
                ? new Date(certificate.date).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600">
              Cert-id: {certificateId || "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Dynamically import html2pdf.js with SSR disabled
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const pdfRefs = useRef({});
  const router = useRouter(); // ✅ Added router for navigation

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/certificate/view");
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      {/* ✅ Back Button */}
      <button
        onClick={() => router.push('/admin-panel')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        ← Back to Admin Panel
      </button>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        All Certificates
      </h2>

      {certificates.length === 0 ? (
        <p className="text-center text-gray-500">No certificates found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="border border-gray-300 rounded-lg shadow-lg bg-white p-4 md:p-6"
            >
              {/* Certificate Template */}
              <div
                ref={(el) => (pdfRefs.current[certificate._id] = el)}
                className="p-4 md:p-6 bg-white rounded-lg shadow-md"
              >
                <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 border-b-2 pb-2">
                  Certificate of Completion
                </h1>
                <div className="text-center space-y-2 md:space-y-4">
                  <p className="text-base md:text-xl">
                    This is to certify that{" "}
                    <span className="font-bold text-lg md:text-2xl">
                      {certificate.recipientName}
                    </span>
                  </p>
                  <p className="text-sm md:text-lg">
                    has successfully completed the{" "}
                    <span className="font-bold">
                      {certificate.internshipType}
                    </span>{" "}
                    in
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-blue-600">
                    {certificate.courseName}
                  </p>
                  <div className="mt-4 md:mt-6">
                    <p className="text-sm md:text-lg">Completed on</p>
                    <p className="text-base md:text-xl font-semibold">
                      {new Date(certificate.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Signature and ID Section */}
                  <div className="mt-6 md:mt-8 flex justify-between items-center">
                    {/* Signature */}
                    <div className="text-left">
                      <div className="border-b-2 border-black w-24 md:w-32 mt-2">
                        <Image
                          src="/sign.png"
                          alt="Signature"
                          width={1000}
                          height={1000}
                          className="w-[80px] md:w-[100px] h-[40px] md:h-[50px]"
                        />
                      </div>
                      <p className="text-xs md:text-sm mt-1">
                        Authorized Signature
                      </p>
                    </div>

                    {/* Certificate ID */}
                    <div className="text-right">
                      <p className="text-xs md:text-sm">Certificate ID:</p>
                      <p className="font-mono text-sm md:text-base">
                        {certificate.certificateId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Download Button */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCertificates;

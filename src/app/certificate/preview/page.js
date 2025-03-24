"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Sidebar from "@/components/Admin/SIdebar";

const CertificatePreview = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef(null);
  const searchParams = useSearchParams();
  const certificateId = searchParams.get("certificateId");

  // ✅ Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Fetch certificate data
  useEffect(() => {
    if (!certificateId) return;

    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/certificate/${certificateId}`);
        if (!res.ok) throw new Error("Failed to fetch certificate");
        const data = await res.json();
        setCertificate(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  // ✅ Function to fix unsupported "oklch" color issues
  const fixUnsupportedColors = () => {
    document.querySelectorAll("*").forEach((el) => {
      const computedColor = window.getComputedStyle(el).color;
      if (computedColor.includes("oklch")) {
        try {
          // Convert to RGB using computed style
          el.style.color = computedColor;
        } catch (e) {
          console.error("Failed to convert oklch to rgb:", e);
          el.style.color = "#000000"; // Fallback to black
        }
      }
    });
  };

  // ✅ Download handler
  // Download handlers
const handleDownload = async (type) => {
  // ✅ Convert unsupported oklch() colors to rgb()
  document.querySelectorAll("*").forEach((el) => {
    if (el.style.color.includes("oklch")) {
      const computedColor = window.getComputedStyle(el).color;
      if (computedColor.startsWith("rgb")) {
        el.style.color = computedColor;
      } else {
        el.style.color = "#000000"; // Fallback to black if conversion fails
      }
    }
  });

  const canvas = await html2canvas(certificateRef.current, { scale: 2 });
  const fileName = `Certificate_${certificate.recipientName}`;

  if (type === "pdf") {
    const pdf = new jsPDF("landscape");
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } else {
    const link = document.createElement("a");
    link.download = `${fileName}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  }
};


  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!certificate) return <div className="p-4 text-center text-red-500">Certificate not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ✅ Certificate Preview */}
      <div className="flex-1 p-8">
        <div ref={certificateRef} className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 border-b-2 pb-4">
            Certificate of Completion
          </h1>
          <div className="text-center space-y-6">
            <p className="text-xl">
              This is to certify that{" "}
              <span className="font-bold text-2xl">
                {certificate.recipientName || "N/A"}
              </span>
            </p>
            <p className="text-xl">
              has successfully completed the{" "}
              <span className="font-bold">{certificate.internshipType || "N/A"}</span>{" "}
              in
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {certificate.courseName || "N/A"}
            </p>
            <div className="mt-8">
              <p className="text-lg">Completed on</p>
              <p className="text-xl font-semibold">
                {certificate.date
                  ? new Date(certificate.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="mt-12 flex justify-between items-center px-8">
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
                <p className="font-mono">{certificate.certificateId || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Download Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => handleDownload("pdf")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownload("jpg")}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download JPG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;

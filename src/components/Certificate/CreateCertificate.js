"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateCertificate = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    courseName: "",
    internshipType: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const router = useRouter();

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log("Submitting Form Data:", formData); // ✅ Debugging Output

    try {
      const res = await fetch("/api/certificate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", res.status); // ✅ Debugging Output

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error Response:", errorData); // ✅ Debugging Output
        throw new Error(errorData.message || "Failed to generate certificate");
      }

      const data = await res.json();
      console.log("Success Response:", data); // ✅ Debugging Output

      if (res.ok) {
        router.push(`/certificate/preview?certificateId=${data.certificate.certificateId}`); // ✅ Public Route
      }
      else {
        throw new Error("Certificate ID missing in response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* ✅ Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src="/image.png"
            alt="Certificate Illustration" width={1000} height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Internship Certificate
          </h2>

          {/* ✅ Recipient Name */}
          <div className="mb-4">
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Recipient Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* ✅ Course Name */}
          <div className="mb-4">
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="AI">AI</option>
              <option value="ML">ML</option>
              <option value="DS">DS</option>
              <option value="AWP">AWP</option>
            </select>
          </div>

          {/* ✅ Internship Type */}
          <div className="mb-4">
            <select
              name="internshipType"
              value={formData.internshipType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            >
              <option value="" disabled>
                Select Internship Type
              </option>
              <option value="Summer Internship">Summer Internship</option>
              <option value="Winter Internship">Winter Internship</option>
              <option value="Virtual Internship">Virtual Internship</option>
            </select>
          </div>

          {/* ✅ Date */}
          <div className="mb-6">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Create Certificate
          </button>

          {/* ✅ Success or Error Message */}
          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;

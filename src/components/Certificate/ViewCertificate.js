'use client';

import { useEffect, useState } from 'react';

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch('/api/certificate/view');
        if (!res.ok) throw new Error(`Failed to load certificates: ${res.status}`);
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCertificates();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (certificates.length === 0) return <p>Loading certificates...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {certificates.map((cert) => (
          <div key={cert._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
            <h3 className="text-lg font-semibold">{cert.recipientName}</h3>
            <p className="text-gray-600"><strong>Course:</strong> {cert.courseName}</p>
            <p className="text-gray-600"><strong>Type:</strong> {cert.internshipType}</p>
            <p className="text-gray-600"><strong>Date:</strong> {new Date(cert.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCertificates;

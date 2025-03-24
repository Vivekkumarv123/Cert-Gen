"use client";

import { useState } from "react";
import { Menu, BarChart, FilePlus, Eye } from "lucide-react";
import Sidebar from "@/components/Admin/SIdebar"; // Import Sidebar Component

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ✅ Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ✅ Hamburger Icon for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden text-gray-600 hover:text-gray-800"
      >
        <Menu size={28} />
      </button>

      {/* ✅ Main Content */}
      <div className="flex-1 p-8 md:ml-64">
        <h2 className="text-3xl font-bold mb-6">Welcome to Admin Panel</h2>

        {/* ✅ Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <BarChart size={32} className="text-blue-500" />
              <div>
                <p className="text-gray-500">Total Certificates</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <FilePlus size={32} className="text-green-500" />
              <div>
                <p className="text-gray-500">New This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <Eye size={32} className="text-purple-500" />
              <div>
                <p className="text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">10</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Recent Activity */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-3">
              <li className="flex justify-between text-gray-600">
                <span>John Doe created a new certificate</span>
                <span className="text-gray-400 text-sm">2 hours ago</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Jane Smith viewed all certificates</span>
                <span className="text-gray-400 text-sm">5 hours ago</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Michael updated certificate #45</span>
                <span className="text-gray-400 text-sm">1 day ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

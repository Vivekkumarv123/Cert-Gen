"use client";

import { useRouter } from "next/navigation";
import { X, FilePlus, Eye, LogOut, BarChart } from "lucide-react";


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* ✅ Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 rounded-r-2xl`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
          <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-2 right-2 p-2 text-white"
      >
            <X size={24} />
          </button>
        </div>

        {/* ✅ Navigation Options */}
        <nav className="space-y-4">
          <button
            onClick={() => {
              setIsSidebarOpen(false);
              router.push("/admin-panel/create-certificate");
            }}
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            <FilePlus size={20} />
            <span>Generate Certificate</span>
          </button>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              router.push("/admin-panel/view-certificates");
            }}
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            <Eye size={20} />
            <span>View All Certificates</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>

        {/* ✅ Stats/Info */}
        <div className="mt-10 p-4 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <div className="flex justify-between text-gray-400">
            <div>
              <p>Total Certificates</p>
              <p className="text-white text-xl font-bold">152</p>
            </div>
            <div>
              <p>New This Week</p>
              <p className="text-white text-xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Background Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;

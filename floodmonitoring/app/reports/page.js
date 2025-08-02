"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Add missing formData state
  const [formData, setFormData] = useState({
    location: "",
    status: "low",
    water_level: "",
    reported_by: "",
    details: "",
  });

  // ✅ Fetch reports
  useEffect(() => {
  fetch("/api/reports")
    .then((res) => res.json())
    .then((data) => setReports(data))
    .catch((err) => console.error(err));
}, []);

const handleDetails = (report) => {
  setSelectedReport(report);
  setShowModal(true);
};

  const handleShare = (report) => {
    const shareText = `📢 Flood Report
📍 Location: ${report.location}
⚠️ Status: ${report.status}
🌊 Water Level: ${report.waterLevel}
👤 Reported By: ${report.reportedBy}
🕒 Time: ${report.time}
📝 Details: ${report.details}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Flood Report",
          text: shareText,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Report details copied to clipboard!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit report");

      const newReport = await res.json();
      setReports([newReport, ...reports]); // ✅ Add new report to the list
      setFormData({
        location: "",
        status: "low",
        water_level: "",
        reported_by: "",
        details: "",
      });
      alert("✅ Report submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting report");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Reports - Flood Monitoring System</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 🔹 Tabs */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Flood Reports</h2>
          <div className="flex space-x-4">
            {["all", "severe", "high", "moderate", "low"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-md ${activeTab === tab
                    ? tab === "severe"
                      ? "bg-red-600 text-white"
                      : tab === "high"
                        ? "bg-orange-500 text-white"
                        : tab === "moderate"
                          ? "bg-yellow-400 text-gray-800"
                          : tab === "low"
                            ? "bg-blue-400 text-white"
                            : "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Reports Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Location", "Status", "Water Level", "Reported By", "Time", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (   // ✅ Changed from filteredReports to reports
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {report.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === "severe"
                            ? "bg-red-100 text-red-800"
                            : report.status === "high"
                              ? "bg-orange-100 text-orange-800"
                              : report.status === "moderate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.waterLevel}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.reportedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.time}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleDetails(report)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleShare(report)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* 🔹 Modal */}
        {showModal && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative text-gray-600">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-3 text-gray-600">Report Details</h2>
              <p><strong>Location:</strong> {selectedReport.location}</p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
              </p>
              <p><strong>Water Level:</strong> {selectedReport.waterLevel}</p>
              <p><strong>Reported By:</strong> {selectedReport.reportedBy}</p>
              <p><strong>Time:</strong> {selectedReport.time}</p>
              <p><strong>Details:</strong> {selectedReport.details}</p>
            </div>
          </div>
        )}

        {/* 🔹 Submit Report Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit New Report</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="water_level" className="block text-sm font-medium text-gray-700 mb-1">
                Water Level
              </label>
              <input
                type="text"
                id="water_level"
                value={formData.water_level}
                onChange={handleChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Estimated water level"
              />
            </div>
            <div>
              <label htmlFor="reported_by" className="block text-sm font-medium text-gray-700 mb-1">
                Reported By
              </label>
              <input
                type="text"
                id="reported_by"
                value={formData.reported_by}
                onChange={handleChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name or station"
              />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                Details
              </label>
              <textarea
                id="details"
                rows="3"
                value={formData.details}
                onChange={handleChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide details about the flood situation"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Flood Monitoring</h3>
              <p className="text-gray-400 text-sm">
                Real-time flood monitoring and alert system for disaster
                prevention.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="hover:text-white">
                    Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-white">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Data Sources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@floodmonitor.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Emergency: 911</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
            <p>
              © {new Date().getFullYear()} Flood Monitoring System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

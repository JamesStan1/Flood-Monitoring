"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null); // ✅ For Details Modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  const filteredAlerts =
    activeFilter === "all"
      ? alerts
      : alerts.filter((alert) => alert.level === activeFilter);

  // ✅ Function for Details
  const handleDetails = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  // ✅ Function for Share
  const handleShare = (alert) => {
    const shareText = `🚨 Flood Alert!
📍 Location: ${alert.location}
⚠️ Level: ${alert.level}
📝 Message: ${alert.message}
⏰ Time: ${new Date(alert.created_at).toLocaleString()}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Flood Alert",
          text: shareText,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Alert details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Alerts - Flood Monitoring System</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Flood Alerts</h2>
          <div className="flex space-x-2">
            {["all", "severe", "high", "moderate", "low"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === filter
                    ? filter === "severe"
                      ? "bg-red-600 text-white"
                      : filter === "high"
                      ? "bg-orange-500 text-white"
                      : filter === "moderate"
                      ? "bg-yellow-400 text-gray-800"
                      : filter === "low"
                      ? "bg-blue-400 text-white"
                      : "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alert Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {alert.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          alert.level === "severe"
                            ? "bg-red-100 text-red-800"
                            : alert.level === "high"
                            ? "bg-orange-100 text-orange-800"
                            : alert.level === "moderate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {alert.level.charAt(0).toUpperCase() +
                          alert.level.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      {alert.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(alert.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleDetails(alert)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleShare(alert)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAlerts.length === 0 && (
              <p className="text-center text-gray-500 p-4">No alerts found.</p>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Modal for Details */}
      {showModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-3 text-blue-700">Alert Details</h2>
            <p className="text-gray-700">
              <strong>Location:</strong> {selectedAlert.location}
            </p>
            <p className="text-gray-700">
              <strong>Level:</strong>{" "}
              {selectedAlert.level.charAt(0).toUpperCase() +
                selectedAlert.level.slice(1)}
            </p>
            <p className="text-gray-700">
              <strong>Message:</strong> {selectedAlert.message}
            </p>
            <p className="text-gray-700">
              <strong>Time:</strong>{" "}
              {new Date(selectedAlert.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}

        {/* Footer */}
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

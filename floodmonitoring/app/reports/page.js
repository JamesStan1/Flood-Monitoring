'use client';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const reports = [
    {
      id: 1,
      location: "Cagayan de Oro River",
      status: 'severe',
      waterLevel: "3.5m",
      reportedBy: "Station #12",
      time: "1 hour ago",
      details: "Water level exceeded danger mark. Flooding in low-lying areas."
    },
    {
      id: 2,
      location: "Macajalar Coastal Area",
      status: 'high',
      waterLevel: "2.8m",
      reportedBy: "Station #08",
      time: "3 hours ago",
      details: "Rising tide combined with heavy rainfall causing coastal flooding."
    },
    {
      id: 3,
      location: "Downtown Area",
      status: 'moderate',
      waterLevel: "1.2m",
      reportedBy: "Station #05",
      time: "5 hours ago",
      details: "Street flooding reported in several areas. Drainage systems overwhelmed."
    },
    {
      id: 4,
      location: "Upper Puerto District",
      status: 'low',
      waterLevel: "0.5m",
      reportedBy: "Station #15",
      time: "8 hours ago",
      details: "Minor water accumulation in some streets. No major impact reported."
    }
  ];

  const filteredReports = activeTab === 'all' 
    ? reports 
    : reports.filter(report => report.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Reports - Flood Monitoring System</title>
      </Head>

      {/* Header - Same as main page */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <h1 className="text-xl font-bold">Flood Monitoring System</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-blue-200">
                  Alerts
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-blue-200 font-semibold">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-200">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Flood Reports</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm rounded-md ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All Reports
            </button>
            <button 
              onClick={() => setActiveTab('severe')}
              className={`px-4 py-2 text-sm rounded-md ${activeTab === 'severe' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Severe
            </button>
            <button 
              onClick={() => setActiveTab('high')}
              className={`px-4 py-2 text-sm rounded-md ${activeTab === 'high' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              High
            </button>
            <button 
              onClick={() => setActiveTab('moderate')}
              className={`px-4 py-2 text-sm rounded-md ${activeTab === 'moderate' ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200 text-gray-700'}`}
            >
              Moderate
            </button>
            <button 
              onClick={() => setActiveTab('low')}
              className={`px-4 py-2 text-sm rounded-md ${activeTab === 'low' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Low
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'severe' ? 'bg-red-100 text-red-800' :
                        report.status === 'high' ? 'bg-orange-100 text-orange-800' :
                        report.status === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.waterLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reportedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                      <button className="text-gray-600 hover:text-gray-900">Share</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit New Report</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  id="status" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="waterLevel" className="block text-sm font-medium text-gray-700 mb-1">Water Level</label>
              <input 
                type="text" 
                id="waterLevel" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Estimated water level"
              />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea 
                id="details" 
                rows="3" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

      {/* Footer - Same as main page */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Flood Monitoring</h3>
              <p className="text-gray-400 text-sm">Real-time flood monitoring and alert system for disaster prevention.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/alerts" className="hover:text-white">Alerts</Link></li>
                <li><Link href="/reports" className="hover:text-white">Reports</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Data Sources</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
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
            <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
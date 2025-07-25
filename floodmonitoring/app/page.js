'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(
  () => import('../components/Map').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

export default function Home() {
  const [floodData, setFloodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [alertLevel, setAlertLevel] = useState('moderate'); // 'low', 'moderate', 'high', 'severe'

  // Simulate fetching flood data
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, you would fetch from your API
      setTimeout(() => {
        setFloodData([
          { 
            id: 1, 
            location: [8.723305556, 124.8045833], 
            level: 'moderate', 
            lastUpdated: new Date(),
            name: "Cagayan de Oro Central"
          },
          { 
            id: 2, 
            location: [8.7333, 124.8145], 
            level: 'high', 
            lastUpdated: new Date(),
            name: "Macajalar Bay Area"
          },
          { 
            id: 3, 
            location: [8.7133, 124.7945], 
            level: 'low', 
            lastUpdated: new Date(),
            name: "Upper Puerto Area"
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Flood Icon" className="h-8 w-8" />
              <h1 className="text-xl font-bold">Flood Monitoring System</h1>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/dashboard" className="hover:text-blue-200 text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-blue-200 text-white">
                  Alerts
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-blue-200 text-white">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-200 text-white">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded text-white">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 text-black">
        {/* Alert Banner */}
        {alertLevel && (
          <div className={`mb-6 p-4 rounded-lg shadow ${
            alertLevel === 'severe' ? 'bg-red-600 text-white' :
            alertLevel === 'high' ? 'bg-orange-500 text-white' :
            alertLevel === 'moderate' ? 'bg-yellow-400 text-black' : 'bg-blue-400 text-black'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="font-semibold">
                  {alertLevel === 'severe' ? 'Severe Flood Alert' :
                   alertLevel === 'high' ? 'High Flood Risk' :
                   alertLevel === 'moderate' ? 'Moderate Flood Risk' : 'Low Flood Risk'}
                </p>
              </div>
              <button className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Map and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Column */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Flood Monitoring Map</h2>
            </div>
            <div className="h-96 w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <MapWithNoSSR floodData={floodData} />
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs">Severe</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                  <span className="text-xs">Moderate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Full Screen
              </button>
            </div>
          </div>

          {/* Data Column */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Flood Data</h2>
            </div>
            <div className="p-4">
              <div className="flex border-b border-gray-200 pb-2 mb-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('alerts')}
                  className={`px-3 py-1 text-sm font-medium ${activeTab === 'alerts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Alerts
                </button>
                <button 
                  onClick={() => setActiveTab('stations')}
                  className={`px-3 py-1 text-sm font-medium ${activeTab === 'stations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Stations
                </button>
              </div>

              {activeTab === 'overview' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Current Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-700">Active Alerts</p>
                        <p className="text-xl font-bold">3</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-700">Monitoring Stations</p>
                        <p className="text-xl font-bold">24</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Recent Events</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start space-x-3">
                          <div className={`mt-1 flex-shrink-0 h-2 w-2 rounded-full ${
                            item === 1 ? 'bg-red-500' : 
                            item === 2 ? 'bg-orange-500' : 'bg-yellow-400'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">Flood alert #{item} triggered</p>
                            <p className="text-xs text-gray-700">2{item} minutes ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'alerts' && (
                <div className="space-y-4">
                  {floodData.map((data) => (
                    <div key={data.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Station #{data.id}</p>
                          <p className={`text-sm ${
                            data.level === 'high' ? 'text-orange-500' :
                            data.level === 'moderate' ? 'text-yellow-500' : 'text-blue-500'
                          }`}>
                            {data.level.charAt(0).toUpperCase() + data.level.slice(1)} risk
                          </p>
                        </div>
                        <span className="text-xs text-gray-700">
                          {data.lastUpdated.toLocaleTimeString()}
                        </span>
                      </div>
                      <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                        View details
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stations' && (
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search stations..." 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black"
                    />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((station) => (
                      <div key={station} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Station #{station}</p>
                            <p className="text-xs text-gray-700">Last update: 15m ago</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Reports</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Water Level</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reported</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((report) => (
                  <tr key={report} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Location {report}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report === 1 ? 'bg-red-100 text-black' :
                        report === 2 ? 'bg-yellow-100 text-black' : 'bg-green-100 text-black'
                      }`}>
                        {report === 1 ? 'Critical' : report === 2 ? 'Warning' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {report === 1 ? '3.2m' : report === 2 ? '2.1m' : '1.4m'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {report} hour{report !== 1 ? 's' : ''} ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Share</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Flood Monitoring</h3>
              <p className="text-sm">Real-time flood monitoring and alert system for disaster prevention.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-200">Home</a></li>
                <li><a href="#" className="hover:text-blue-200">Map</a></li>
                <li><a href="#" className="hover:text-blue-200">Alerts</a></li>
                <li><a href="#" className="hover:text-blue-200">Reports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-200">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-200">API</a></li>
                <li><a href="#" className="hover:text-blue-200">Data Sources</a></li>
                <li><a href="#" className="hover:text-blue-200">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@floodmonitor.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Emergency: 911</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
            <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
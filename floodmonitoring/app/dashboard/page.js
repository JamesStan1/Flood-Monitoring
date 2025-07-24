'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Dashboard() {
  const [floodData, setFloodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setFloodData([
          { 
            id: 1, 
            location: [8.723305556, 124.8045833], 
            level: 'moderate', 
            lastUpdated: new Date(),
            name: "Cagayan de Oro Central",
            waterLevel: 2.4,
            trend: 'rising'
          },
          { 
            id: 2, 
            location: [8.7333, 124.8145], 
            level: 'high', 
            lastUpdated: new Date(),
            name: "Macajalar Bay Area",
            waterLevel: 3.1,
            trend: 'stable'
          },
          { 
            id: 3, 
            location: [8.7133, 124.7945], 
            level: 'low', 
            lastUpdated: new Date(),
            name: "Upper Puerto Area",
            waterLevel: 1.2,
            trend: 'falling'
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const criticalStations = floodData.filter(station => station.level === 'high' || station.level === 'severe').length;
  const totalStations = floodData.length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white shadow-md transition-all duration-300`}>
        <div className="p-4 flex items-center space-x-2 border-b border-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          {sidebarOpen && <h1 className="text-xl font-bold">Flood Monitor</h1>}
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {sidebarOpen && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {sidebarOpen && <span>Alerts</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {sidebarOpen && <span>Reports</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {sidebarOpen && <span>About</span>}
              </a>
            </li>
            <li className="pt-4 mt-4 border-t border-blue-700">
              <a href="/manage-sensors" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                {sidebarOpen && <span>Manage Sensors</span>}
              </a>
            </li>
            <li>
              <a href="/user-management" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {sidebarOpen && <span>User Management</span>}
              </a>
            </li>
            <li>
              <a href="/water-level-history" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                {sidebarOpen && <span>Water Level History</span>}
              </a>
            </li>
            <li>
              <a href="/sms-settings" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {sidebarOpen && <span>SMS Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 absolute bottom-0 w-full">
         
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Flood Monitoring Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Flood Monitoring Overview</h2>
              <p className="text-gray-600">Real-time data from monitoring stations</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="1h">Last hour</option>
                <option value="6h">Last 6 hours</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Export Data
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
              <h3 className="text-sm font-medium text-gray-500">Critical Stations</h3>
              <p className="text-2xl font-bold">{criticalStations}</p>
              <p className="text-xs text-gray-500">{Math.round((criticalStations / totalStations) * 100)}% of total</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
              <h3 className="text-sm font-medium text-gray-500">Warning Stations</h3>
              <p className="text-2xl font-bold">{floodData.filter(s => s.level === 'moderate').length}</p>
              <p className="text-xs text-gray-500">Monitor closely</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-gray-500">Normal Stations</h3>
              <p className="text-2xl font-bold">{floodData.filter(s => s.level === 'low').length}</p>
              <p className="text-xs text-gray-500">No immediate risk</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-gray-500">Total Stations</h3>
              <p className="text-2xl font-bold">{totalStations}</p>
              <p className="text-xs text-gray-500">Active monitoring points</p>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Map Column */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Flood Monitoring Map</h2>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Layers
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Full Screen
                  </button>
                </div>
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
            </div>

            {/* Station Status Column */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Station Status</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {floodData.map((station) => (
                    <div key={station.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{station.name}</p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              station.level === 'high' ? 'bg-red-500' :
                              station.level === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></span>
                            <p className="text-sm text-gray-600">
                              {station.level.charAt(0).toUpperCase() + station.level.slice(1)} risk
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{station.waterLevel}m</p>
                          <div className={`flex items-center justify-end text-xs ${
                            station.trend === 'rising' ? 'text-red-500' :
                            station.trend === 'falling' ? 'text-green-500' : 'text-gray-500'
                          }`}>
                            {station.trend === 'rising' ? '↑' : station.trend === 'falling' ? '↓' : '→'} {station.trend}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                        <span>Last updated: {station.lastUpdated.toLocaleTimeString()}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Additional Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Water Level Trends */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Water Level Trends</h2>
              </div>
              <div className="p-4 h-64 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Water level chart will be displayed here</p>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { id: 1, station: "Macajalar Bay Area", level: "High", time: "15 minutes ago", type: "water_level" },
                  { id: 2, station: "Cagayan de Oro Central", level: "Moderate", time: "42 minutes ago", type: "water_level" },
                  { id: 3, station: "Upper Puerto Area", level: "Low", time: "2 hours ago", type: "equipment" }
                ].map(alert => (
                  <div key={alert.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                        alert.level === "High" ? "bg-red-500" :
                        alert.level === "Moderate" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{alert.station}</p>
                        <p className="text-sm text-gray-500">{alert.level} alert - {alert.type.replace('_', ' ')}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {alert.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
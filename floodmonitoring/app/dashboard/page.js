'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import components
const MapWithNoSSR = dynamic(() => import('../../components/Map'), { ssr: false });
const ManageSensors = dynamic(() => import('../manage-sensors/page'));
const UserManagement = dynamic(() => import('../user-management/page'));
const SMSSettings = dynamic(() => import('../smssettings/page'));
const WaterLevelHistory = dynamic(() => import('../water-level-history/page'));

export default function Dashboard() {
  const router = useRouter();
  const [floodData, setFloodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

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

    if (activeTab === 'dashboard') {
      fetchData();
    }
  }, [activeTab]);

  const criticalStations = floodData.filter(station => station.level === 'high' || station.level === 'severe').length;
  const totalStations = floodData.length;

  const handleBackToHomepage = () => {
    router.push('/'); // Adjust the route as needed for your homepage
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Flood Monitoring Overview</h2>
                <p className="text-gray-700">Real-time data from monitoring stations</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
                >
                  <option value="1h">Last hour</option>
                  <option value="6h">Last 6 hours</option>
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                <h3 className="text-sm font-medium">Critical Stations</h3>
                <p className="text-2xl font-bold">{criticalStations}</p>
                <p className="text-xs">{Math.round((criticalStations / totalStations) * 100)}% of total</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium">Warning Stations</h3>
                <p className="text-2xl font-bold">{floodData.filter(s => s.level === 'moderate').length}</p>
                <p className="text-xs">Monitor closely</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                <h3 className="text-sm font-medium">Normal Stations</h3>
                <p className="text-2xl font-bold">{floodData.filter(s => s.level === 'low').length}</p>
                <p className="text-xs">No immediate risk</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                <h3 className="text-sm font-medium">Total Stations</h3>
                <p className="text-2xl font-bold">{totalStations}</p>
                <p className="text-xs">Active monitoring points</p>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Map Column */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Flood Monitoring Map</h2>
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
                  <h2 className="text-lg font-semibold">Station Status</h2>
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
                              <p className="text-sm">
                                {station.level.charAt(0).toUpperCase() + station.level.slice(1)} risk
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{station.waterLevel}m</p>
                            <div className={`flex items-center justify-end text-xs ${
                              station.trend === 'rising' ? 'text-red-500' :
                              station.trend === 'falling' ? 'text-green-500' : 'text-gray-700'
                            }`}>
                              {station.trend === 'rising' ? '↑' : station.trend === 'falling' ? '↓' : '→'} {station.trend}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-xs">
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

            {/* Charts */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Water Level Trends</h2>
              </div>
              <div className="p-4 h-64 flex items-center justify-center bg-gray-50">
                <p className="text-gray-700">Water level chart will be displayed here</p>
              </div>
            </div>
          </>
        );
      case 'manage-sensors':
        return <ManageSensors />;
      case 'user-management':
        return <UserManagement />;
      case 'sms-settings':
        return <SMSSettings />;
      case 'water-level-history':
        return <WaterLevelHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-black">
      {/* Sidebar Navigation */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white shadow-md transition-all duration-300 flex flex-col`}>
        <div>
          <div className="p-4 flex items-center space-x-2 border-b border-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            {sidebarOpen && <h1 className="text-xl font-bold">Flood Monitor</h1>}
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 p-2 rounded w-full text-left ${activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  {sidebarOpen && <span>Dashboard</span>}
                </button>
              </li>
              <li className="pt-4 mt-4 border-t border-blue-700">
                <button 
                  onClick={() => setActiveTab('manage-sensors')}
                  className={`flex items-center space-x-2 p-2 rounded w-full text-left ${activeTab === 'manage-sensors' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  {sidebarOpen && <span>Manage Sensors</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('user-management')}
                  className={`flex items-center space-x-2 p-2 rounded w-full text-left ${activeTab === 'user-management' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {sidebarOpen && <span>User Management</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('sms-settings')}
                  className={`flex items-center space-x-2 p-2 rounded w-full text-left ${activeTab === 'sms-settings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {sidebarOpen && <span>SMS Settings</span>}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('water-level-history')}
                  className={`flex items-center space-x-2 p-2 rounded w-full text-left ${activeTab === 'water-level-history' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  {sidebarOpen && <span>Water Level History</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-auto p-4 border-t border-blue-700">
          <button 
            onClick={handleBackToHomepage}
            className="flex items-center space-x-2 p-2 rounded w-full text-left hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {sidebarOpen && <span>Back to Homepage</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {activeTab === 'dashboard' && 'Flood Monitoring Dashboard'}
                {activeTab === 'manage-sensors' && 'Manage Sensors'}
                {activeTab === 'user-management' && 'User Management'}
                {activeTab === 'sms-settings' && 'SMS Settings'}
                {activeTab === 'water-level-history' && 'Water Level History'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
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
          {renderMainContent()}
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
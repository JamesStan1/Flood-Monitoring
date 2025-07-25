'use client';

import { useState } from 'react';

export default function WaterLevelHistory() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedStation, setSelectedStation] = useState('all');

  const stations = [
    { id: 'all', name: 'All Stations' },
    { id: '1', name: 'Cagayan de Oro Central' },
    { id: '2', name: 'Macajalar Bay Area' },
    { id: '3', name: 'Upper Puerto Area' },
  ];

  // Mock data for the chart
  const chartData = [
    { time: '00:00', level: 1.2 },
    { time: '04:00', level: 1.5 },
    { time: '08:00', level: 2.1 },
    { time: '12:00', level: 2.8 },
    { time: '16:00', level: 2.5 },
    { time: '20:00', level: 1.9 },
    { time: '24:00', level: 1.4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
              <p className="text-gray-600">Historical water level measurements</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {stations.map(station => (
                <option key={station.id} value={station.id}>{station.name}</option>
              ))}
            </select>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="custom">Custom range</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Export Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {stations.find(s => s.id === selectedStation)?.name || 'All Stations'} - Water Level Trend
            </h3>
          </div>
          <div className="p-6 h-96">
            {/* Chart placeholder - in a real app you would use a charting library like Chart.js */}
            <div className="h-full w-full border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Water level chart will be displayed here</p>
                <div className="w-full h-48 bg-gradient-to-t from-blue-100 to-white relative">
                  {chartData.map((data, index) => (
                    <div 
                      key={index}
                      className="absolute bottom-0 bg-blue-500 w-8"
                      style={{
                        left: `${(index / (chartData.length - 1)) * 90 + 5}%`,
                        height: `${(data.level / 3) * 100}%`
                      }}
                    >
                      <div className="absolute -bottom-6 text-xs text-gray-500 w-16 -ml-4">{data.time}</div>
                      <div className="absolute -top-6 text-xs font-medium w-16 -ml-4">{data.level}m</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Historical Data</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, datetime: '2023-05-15 08:00', station: 'Cagayan de Oro Central', level: 2.1, status: 'moderate' },
                  { id: 2, datetime: '2023-05-15 12:00', station: 'Macajalar Bay Area', level: 2.8, status: 'high' },
                  { id: 3, datetime: '2023-05-15 16:00', station: 'Upper Puerto Area', level: 1.5, status: 'low' },
                  { id: 4, datetime: '2023-05-14 08:00', station: 'Cagayan de Oro Central', level: 1.8, status: 'moderate' },
                  { id: 5, datetime: '2023-05-14 12:00', station: 'Macajalar Bay Area', level: 2.3, status: 'moderate' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.datetime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.station}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.level}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'high' ? 'bg-red-100 text-red-800' :
                        row.status === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 1 to 5 of 25 entries
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">Next</button>
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
  );
}
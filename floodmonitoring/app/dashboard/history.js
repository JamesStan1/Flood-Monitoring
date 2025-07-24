import DashboardLayout from './dashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', level: 1.2 },
  { name: 'Feb', level: 1.5 },
  { name: 'Mar', level: 1.8 },
  { name: 'Apr', level: 2.1 },
  { name: 'May', level: 2.5 },
  { name: 'Jun', level: 3.0 },
  { name: 'Jul', level: 3.2 },
  { name: 'Aug', level: 3.0 },
  { name: 'Sep', level: 2.8 },
  { name: 'Oct', level: 2.5 },
  { name: 'Nov', level: 2.2 },
  { name: 'Dec', level: 1.8 },
];

export default function WaterLevelHistory() {
  return (
    <DashboardLayout activeMenu="history">
      <Head>
        <title>Water Level History | Flood Monitoring</title>
      </Head>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Water Level History</h2>
        
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Stations</option>
              <option>Cagayan River</option>
              <option>Macajalar Bay</option>
              <option>Upper Puerto</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Apply Filters
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="level" stroke="#3B82F6" strokeWidth={2} name="Water Level (m)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Historical Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level (m)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((record) => (
                <tr key={record}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - (record * 86400000)).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record === 1 ? 'Cagayan River' : 
                     record === 2 ? 'Macajalar Bay' : 
                     record === 3 ? 'Upper Puerto' : 
                     record === 4 ? 'Lower Puerto' : 'Downtown Area'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(2.5 + (record * 0.2)).toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record === 3 ? 'bg-red-100 text-red-800' : 
                      record === 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {record === 3 ? 'Critical' : record === 4 ? 'Warning' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
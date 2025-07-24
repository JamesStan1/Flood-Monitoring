import DashboardLayout from './dashboard';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('@components/Map'),
  { ssr: false }
);

export default function Dashboard() {
  return (
    <DashboardLayout activeMenu="dashboard">
      <Head>
        <title>Dashboard Overview | Flood Monitoring</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Active Sensors</h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              24/26
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="mt-1 text-sm text-gray-500">2 sensors offline</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              3 Critical
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-9">8</p>
          <p className="mt-1 text-sm text-gray-500">5 warnings, 3 critical</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Registered Users</h3>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              3 New
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">42</p>
          <p className="mt-1 text-sm text-gray-500">5 admins, 37 regular users</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Flood Status</h3>
        <div className="h-96 w-full">
          <MapWithNoSSR floodData={[]} />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((alert) => (
                <tr key={alert}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Station {alert}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      alert === 1 ? 'bg-red-100 text-red-800' : 
                      alert === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {alert === 1 ? 'Critical' : alert === 2 ? 'Warning' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert === 1 ? '3.5m' : alert === 2 ? '2.8m' : '1.2m'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert === 1 ? '10 min ago' : alert === 2 ? '25 min ago' : '1 hour ago'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Acknowledge</button>
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
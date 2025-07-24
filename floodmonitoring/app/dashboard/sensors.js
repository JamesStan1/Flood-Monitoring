import DashboardLayout from './dashboard';

export default function ManageSensors() {
  return (
    <DashboardLayout activeMenu="sensors">
      <Head>
        <title>Manage Sensors | Flood Monitoring</title>
      </Head>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Manage Sensors</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Add New Sensor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((sensor) => (
                <tr key={sensor}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SENS-{100 + sensor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sensor === 1 ? 'Cagayan River' : 
                     sensor === 2 ? 'Macajalar Bay' : 
                     sensor === 3 ? 'Upper Puerto' : 
                     sensor === 4 ? 'Lower Puerto' : 'Downtown Area'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sensor === 2 ? 'bg-red-100 text-red-800' : 
                      sensor === 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {sensor === 2 ? 'Offline' : sensor === 4 ? 'Maintenance' : 'Online'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sensor === 2 ? '--' : `${1.5 + (sensor * 0.3).toFixed(1)}m`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
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
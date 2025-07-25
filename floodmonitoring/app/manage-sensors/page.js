'use client';
import { useState } from 'react';

export default function ManageSensors() {
  const [sensors, setSensors] = useState([
    { id: 1, name: 'River Sensor 1', status: 'active', location: 'Cagayan River', lastReading: '2.4m', battery: '85%' },
    { id: 2, name: 'Bridge Sensor 2', status: 'active', location: 'Macajalar Bridge', lastReading: '1.8m', battery: '72%' },
    { id: 3, name: 'Dam Sensor 1', status: 'maintenance', location: 'Puerto Dam', lastReading: 'N/A', battery: '15%' },
    { id: 4, name: 'Coastal Sensor 3', status: 'inactive', location: 'Macajalar Bay', lastReading: '0.9m', battery: '92%' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSensor, setNewSensor] = useState({
    name: '',
    location: '',
    status: 'active'
  });

  const handleAddSensor = () => {
    const newId = Math.max(...sensors.map(s => s.id)) + 1;
    setSensors([...sensors, {
      id: newId,
      name: newSensor.name,
      location: newSensor.location,
      status: newSensor.status,
      lastReading: '0.0m',
      battery: '100%'
    }]);
    setIsAddModalOpen(false);
    setNewSensor({ name: '', location: '', status: 'active' });
  };

  const toggleSensorStatus = (id) => {
    setSensors(sensors.map(sensor => 
      sensor.id === id 
        ? { 
            ...sensor, 
            status: sensor.status === 'active' ? 'inactive' : 'active' 
          } 
        : sensor
    ));
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Sensor Management</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Add New Sensor
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reading</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sensor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sensor.status === 'active' ? 'bg-green-100 text-green-800' :
                      sensor.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.lastReading}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          parseInt(sensor.battery) > 60 ? 'bg-green-600' :
                          parseInt(sensor.battery) > 30 ? 'bg-yellow-500' : 'bg-red-600'
                        }`} 
                        style={{ width: sensor.battery }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{sensor.battery}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => toggleSensorStatus(sensor.id)}
                      className={`mr-3 ${
                        sensor.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {sensor.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sensor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Sensor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Name</label>
                <input
                  type="text"
                  value={newSensor.name}
                  onChange={(e) => setNewSensor({...newSensor, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter sensor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newSensor.location}
                  onChange={(e) => setNewSensor({...newSensor, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newSensor.status}
                  onChange={(e) => setNewSensor({...newSensor, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSensor}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Add Sensor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
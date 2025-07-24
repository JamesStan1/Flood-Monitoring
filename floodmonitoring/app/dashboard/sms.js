import DashboardLayout from './dashboard';
import { useState } from 'react';

export default function SMSSettings() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [recipients, setRecipients] = useState([
    '+639123456789',
    '+639987654321',
    '+639555555555'
  ]);
  const [newRecipient, setNewRecipient] = useState('');

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient('');
    }
  };

  const removeRecipient = (number) => {
    setRecipients(recipients.filter(r => r !== number));
  };

  return (
    <DashboardLayout activeMenu="sms">
      <Head>
        <title>SMS Settings | Flood Monitoring</title>
      </Head>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">SMS Alert Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Enable SMS Alerts</h3>
              <p className="text-sm text-gray-500">Turn on/off SMS notifications for flood alerts</p>
            </div>
            <button
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`${
                smsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  smsEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Recipients</h3>
            <p className="text-sm text-gray-500 mb-4">Phone numbers that will receive flood alerts</p>
            
            <div className="space-y-2 mb-4">
              {recipients.map((number) => (
                <div key={number} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <span className="font-mono">{number}</span>
                  <button 
                    onClick={() => removeRecipient(number)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="tel"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                placeholder="+639XXXXXXXXX"
                className="border border-gray-300 rounded-md px-3 py-2 flex-1"
              />
              <button
                onClick={addRecipient}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Alert Thresholds</h3>
            <p className="text-sm text-gray-500 mb-4">Set water level thresholds for SMS alerts</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Warning Level</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    defaultValue="2.0"
                    step="0.1"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <span className="ml-2">meters</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Critical Level</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    defaultValue="3.0"
                    step="0.1"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <span className="ml-2">meters</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Save Settings
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Logs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((log) => (
                <tr key={log}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - (log * 3600000)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +639******{100 + log}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log === 1 ? 'Warning: Water level reached 2.1m at Cagayan River' : 
                     log === 2 ? 'Alert: Water level critical at 3.2m - Macajalar Bay' : 
                     'Test message: Flood monitoring system check'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log === 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {log === 2 ? 'Delivered' : 'Sent'}
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
// app/sms-settings/page.js
'use client';
import { useState } from 'react';

export default function SmsSettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    alertThreshold: 'high',
    recipients: ['+639123456789', '+639987654321'],
    testMode: false
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">SMS Alert Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-800">SMS Alerts</h2>
              <p className="text-sm text-gray-500">Enable or disable SMS notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.enabled}
                onChange={() => setSettings({...settings, enabled: !settings.enabled})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Alert Threshold</h2>
            <select 
              value={settings.alertThreshold}
              onChange={(e) => setSettings({...settings, alertThreshold: e.target.value})}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full max-w-xs"
            >
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
              <option value="severe">Severe Risk</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Recipients</h2>
            <div className="space-y-2">
              {settings.recipients.map((recipient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={recipient}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                    onChange={(e) => {
                      const newRecipients = [...settings.recipients];
                      newRecipients[index] = e.target.value;
                      setSettings({...settings, recipients: newRecipients});
                    }}
                  />
                  <button 
                    className="text-red-600 hover:text-red-800 p-2"
                    onClick={() => {
                      const newRecipients = settings.recipients.filter((_, i) => i !== index);
                      setSettings({...settings, recipients: newRecipients});
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                className="text-blue-600 hover:text-blue-800 mt-2"
                onClick={() => setSettings({...settings, recipients: [...settings.recipients, '']})}
              >
                + Add Recipient
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - Flood Monitoring System</title>
      </Head>

      {/* Header - Same as main page */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <h1 className="text-xl font-bold">Flood Monitoring System</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-blue-200">
                  Alerts
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-blue-200">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-200 font-semibold">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Flood Monitoring System</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                The Flood Monitoring System is a comprehensive platform designed to provide real-time monitoring, 
                early warnings, and data analysis for flood-prone areas. Our system integrates data from various 
                sensors, weather stations, and satellite imagery to deliver accurate and timely flood information.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To reduce the impact of floods on communities by providing reliable, real-time information that 
                enables timely decision-making and effective disaster response.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Features</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                <li>Real-time flood monitoring through a network of sensors</li>
                <li>Automated alert system for early warnings</li>
                <li>Historical data analysis and flood prediction models</li>
                <li>Interactive maps showing flood risks and affected areas</li>
                <li>Mobile-friendly interface for on-the-go access</li>
                <li>API for integration with other emergency systems</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Frontend</p>
                  <p className="text-sm text-gray-600">Next.js, React, Tailwind CSS</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Backend</p>
                  <p className="text-sm text-gray-600">Node.js, Express, MongoDB</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Mapping</p>
                  <p className="text-sm text-gray-600">Leaflet, Mapbox</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Data Processing</p>
                  <p className="text-sm text-gray-600">Python, TensorFlow</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">IoT Integration</p>
                  <p className="text-sm text-gray-600">MQTT, WebSockets</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Our Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">Dr. Maria Santos</h4>
                  <p className="text-sm text-gray-600 mb-2">Hydrologist & Project Lead</p>
                  <p className="text-xs text-gray-500">20+ years in flood risk management</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">John Dela Cruz</h4>
                  <p className="text-sm text-gray-600 mb-2">Software Engineer</p>
                  <p className="text-xs text-gray-500">Full-stack development & IoT</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">Sarah Lim</h4>
                  <p className="text-sm text-gray-600 mb-2">Data Scientist</p>
                  <p className="text-xs text-gray-500">Flood prediction models</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Partners</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-20 w-32">
                  <span className="font-medium text-gray-700">NDRRMC</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-20 w-32">
                  <span className="font-medium text-gray-700">PAGASA</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-20 w-32">
                  <span className="font-medium text-gray-700">Local Govt</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-20 w-32">
                  <span className="font-medium text-gray-700">University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Same as main page */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Flood Monitoring</h3>
              <p className="text-gray-400 text-sm">Real-time flood monitoring and alert system for disaster prevention.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/alerts" className="hover:text-white">Alerts</Link></li>
                <li><Link href="/reports" className="hover:text-white">Reports</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Data Sources</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@floodmonitor.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Emergency: 911</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
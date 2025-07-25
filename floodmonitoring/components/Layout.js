'use client';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import Navigation from './Navigation';

export default function Layout({ children, title = "Flood Monitoring System" }) {
  const currentPath = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>

      {/* Header */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <h1 className="text-xl font-bold">Flood Monitoring System</h1>
          </div>
          <Navigation currentPath={currentPath} />
          <div className="flex items-center space-x-4">
            <button className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-white-400">
          <p>© {new Date().getFullYear()} Flood Monitoring System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
'use client';
import Link from 'next/link';
import Head from 'next/head';
import Header from "../../components/Header"; // adjust path

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About - Flood Monitoring System</title>
      </Head>

      <Header />

      {/* ✅ About Section */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">About the Flood Monitoring System</h1>
          <p className="text-gray-700 text-lg mb-4">
            The Flood Monitoring System is a real-time web application that provides updates on flood situations
            in various locations. It aims to help communities and authorities by delivering timely alerts and
            critical information to prevent disaster and save lives.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            📌 <strong>Main Features:</strong> Real-time alerts, interactive maps, and reporting tools for flood incidents.
          </p>
          <p className="text-gray-700 text-lg">
            👨‍💻 <strong>Developed by:</strong> Students from St. Rita's College of Balingasag.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">Our Goal</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our mission is to provide accurate and accessible flood-related information to local communities
          and authorities, helping them make informed decisions to reduce risks during flood events.
        </p>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Flood Monitoring</h3>
              <p className="text-gray-400 text-sm">
                Real-time flood monitoring and alert system for disaster prevention. <br />
                <span className="block mt-2 text-sm text-gray-300">
                  <p className="font-bold">Developed by:</p><strong><p>Ronnel Japus</p>
                    <p>Paul Adrian Moreno</p>
                    <p>James Stanley Macarulay</p>
                    <p>Ma. Isabel Cabana</p></strong>

                </span>
              </p>
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

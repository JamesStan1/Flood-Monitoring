import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-blue-800 text-white shadow-lg">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Flood Monitoring</h1>
          <p className="text-sm text-blue-200">Admin Dashboard</p>
        </div>
        <nav className="mt-4">
          <NavItem 
            href="/dashboard" 
            icon="dashboard" 
            active={activeMenu === 'dashboard'}
          >
            Dashboard Overview
          </NavItem>
          <NavItem 
            href="/dashboard/sensors" 
            icon="sensors" 
            active={activeMenu === 'sensors'}
          >
            Manage Sensors
          </NavItem>
          <NavItem 
            href="/dashboard/users" 
            icon="people" 
            active={activeMenu === 'users'}
          >
            User Management
          </NavItem>
          <NavItem 
            href="/dashboard/history" 
            icon="history" 
            active={activeMenu === 'history'}
          >
            Water Level History
          </NavItem>
          <NavItem 
            href="/dashboard/sms" 
            icon="sms" 
            active={activeMenu === 'sms'}
          >
            SMS Settings
          </NavItem>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center">
                <img 
                  className="w-8 h-8 rounded-full" 
                  src="https://ui-avatars.com/api/?name=Admin&background=random" 
                  alt="User" 
                />
                <span className="ml-2 text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ href, icon, active, children }) => {
  const router = useRouter();
  const isActive = active || router.pathname === href;

  return (
    <Link href={href}>
      <a className={`flex items-center px-4 py-3 ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'} transition-colors duration-200`}>
        <NavIcon name={icon} active={isActive} />
        <span className="ml-3">{children}</span>
      </a>
    </Link>
  );
};

const NavIcon = ({ name, active }) => {
  const iconColor = active ? 'text-white' : 'text-blue-300';
  
  switch (name) {
    case 'dashboard':
      return (
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case 'sensors':
      return (
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case 'people':
      return (
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'history':
      return (
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'sms':
      return (
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
    default:
      return null;
  }
};

export default DashboardLayout;
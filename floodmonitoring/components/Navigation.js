'use client';
import Link from 'next/link';

export default function Navigation({ currentPath }) {
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/manage-sensors', name: 'Manage Sensors' },
    { path: '/user-management', name: 'User Management' },
    { path: '/water-level-history', name: 'Water Level History' },
    { path: '/sms-settings', name: 'SMS Settings' },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`hover:text-blue-200 ${
                currentPath === item.path ? 'text-white font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
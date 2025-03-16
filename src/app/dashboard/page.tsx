'use client';

import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function DashboardPage() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by ProtectedRoute
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="space-x-4">
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Site Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
              <p className="text-gray-600">
                You are logged in as: {user?.email}
              </p>
            </div>
            {/* Add more dashboard content here */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
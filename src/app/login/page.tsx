'use client';

import { LoginForm } from '../../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <LoginForm />
      <p className="text-center mt-4">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
} 
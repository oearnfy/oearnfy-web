'use client';

import { SignupForm } from '../../components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <SignupForm />
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
} 
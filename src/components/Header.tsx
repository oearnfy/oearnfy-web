import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="OEARNFY Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                OEARNFY
              </span>
            </Link>
            <p className="text-gray-600 hidden sm:block ml-4">
              Welcome to the future of earning - Your gateway to financial freedom
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}; 
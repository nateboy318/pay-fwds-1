import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-brand1 border-b border-gray-200 absolute top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          
          <div className="hidden md:flex space-x-8 font-bold text-xs">
            <Link href="/" className="text-white hover:text-gray-200 transition-colors">
              HOME
            </Link>
            <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
              ABOUT US
            </Link>
            <Link href="/services" className="text-white hover:text-gray-200 transition-colors">
              SERVICES
            </Link>
            <Link href="/partners" className="text-white hover:text-gray-200 transition-colors">
              PARTNERS
            </Link>
            <Link href="/resources" className="text-white hover:text-gray-200 transition-colors">
              RESOURCES
            </Link>
            <Link href="/news" className="text-white hover:text-gray-200 transition-colors">
              NEWS
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
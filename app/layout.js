import { Inter } from "next/font/google";
import Image from 'next/image';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tweetor",
  description: "Tweetor is a social media platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
        <div className="flex h-screen bg-black">
          {/* Sidebar */}
          <div className="w-64 bg-black p-4 text-white border border-gray-300 border-l-0 border-t-0 border-b-0 border-r-1 border-white">
            {/* Sidebar Content */}
            <Image
              src='/logo.png'
              width={100}
              height={100}
              alt="Tweetor Logo"
            />
            <ul>
              <li className="mb-2">
                <a href="/login" className="text-gray-300 hover:text-white">Login</a>
              </li>
              <li className="mb-2">
                <a href="/signup" className="text-gray-300 hover:text-white">Signup</a>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {children}
          </div>      
        </div>
      </body>
    </html>
  );
}

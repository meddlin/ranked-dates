import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Ranked Dates",
  description: "Track and ideas to make date night easier!",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <header className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
              >
                Pinmark
              </Link>
            </div>

            <div className="flex-1"></div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
              <SignedIn>
                <Link
                  href="/import"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Import
                </Link>
                <Link
                  href="/locations"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Locations
                </Link>
                {/* <Link
                         href="/profile"
                         className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                         data-oid="47za:zk"
                        >
                         Profile
                        </Link> */}
              </SignedIn>
            </nav>

            <div className="hidden md:block w-px h-6 bg-gray-300 mx-4"></div>

            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <button className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">In</span>
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <span className="hidden sm:inline">Sign Up</span>
                    <span className="sm:hidden">Up</span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <SignOutButton>
                  <button className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

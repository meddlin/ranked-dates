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
    <ClerkProvider data-oid="cduyyy0">
      <html lang="en" data-oid="kfco9dn">
        <body className="antialiased" data-oid="-cwkdbq">
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="wje691u"
          >
            <div className="flex items-center" data-oid="941.gri">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid=":kx5883"
              >
                Ranked Dates
              </Link>
            </div>

            <div className="flex-1" data-oid="x6a..de"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="_el822l"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="f5.bkf9"
              >
                Home
              </Link>
              <SignedIn data-oid="wp_onr2">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="33ed1dd"
                >
                  Dashboard
                </Link>
                <Link
                  href="/locations"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="3tzijc-"
                >
                  My Places
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="ljcgmdf"
                >
                  Profile
                </Link>
              </SignedIn>
            </nav>

            <div
              className="hidden md:block w-px h-6 bg-gray-300 mx-4"
              data-oid=":ncoas2"
            ></div>

            <div className="flex items-center gap-3" data-oid="d7l1vt4">
              <SignedOut data-oid="7ko_h7d">
                <SignInButton data-oid="uxs86_u">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="x9:uqo_"
                  >
                    <span className="hidden sm:inline" data-oid="i0p4744">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="c1nlbee">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid="wp2jcu.">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="7.rrv9y"
                  >
                    <span className="hidden sm:inline" data-oid="9itdxtk">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="lz0-vwq">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="-58eqy4">
                <UserButton data-oid="e6ru4z." />
                <SignOutButton data-oid="r52u7tf">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid=":9_r8ky"
                  >
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

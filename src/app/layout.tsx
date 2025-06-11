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
    <ClerkProvider data-oid="jj6q_::">
      <html lang="en" data-oid="hnmna-d">
        <body className="antialiased" data-oid="g6lqjn4">
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="c6i2etm"
          >
            <div className="flex items-center" data-oid="cruyy-.">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid="irqayg7"
              >
                Ranked Dates
              </Link>
            </div>

            <div className="flex-1" data-oid="sh-4lak"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="10yhpyv"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="aqs03hy"
              >
                Home
              </Link>
              <SignedIn data-oid="60y-swz">
                <Link
                  href="/import"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="hshew29"
                >
                  Import
                </Link>
                <Link
                  href="/locations"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="cng58t_"
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

            <div
              className="hidden md:block w-px h-6 bg-gray-300 mx-4"
              data-oid="p._xtq6"
            ></div>

            <div className="flex items-center gap-3" data-oid="dpwji1r">
              <SignedOut data-oid="kz9pvew">
                <SignInButton data-oid=":i94ato">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="-lyuwt-"
                  >
                    <span className="hidden sm:inline" data-oid="le.7_cz">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="2l.bvzs">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid=":8gy3je">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="agi8rct"
                  >
                    <span className="hidden sm:inline" data-oid="d1shaw.">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="t31updz">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="waavxe_">
                <UserButton data-oid="sbi0al1" />
                <SignOutButton data-oid="u_kyolh">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="2k1a.a7"
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

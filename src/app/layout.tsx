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
  title: "Pinmark",
  description: "Track and ideas to make date night easier!",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider data-oid="vka97kr">
      <html lang="en" data-oid="c-771b9">
        <body className="antialiased" data-oid="q54vsdo">
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="ktmb_l0"
          >
            <div className="flex items-center" data-oid="5o_t_:4">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid="a:bf3t4"
              >
                Pinmark
              </Link>
            </div>

            <div className="flex-1" data-oid="r6srto:"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="xaxwaa2"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="7_5py62"
              >
                Home
              </Link>
              <SignedIn data-oid="3jmapsl">
                <Link
                  href="/import"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="73-y506"
                >
                  Import
                </Link>
                <Link
                  href="/locations"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="49p4_rn"
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
              data-oid="cfvei2:"
            ></div>

            <div className="flex items-center gap-3" data-oid="4v5pi.6">
              <SignedOut data-oid=".nn2c8w">
                <SignInButton data-oid="1s8qyu3">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="n162kgj"
                  >
                    <span className="hidden sm:inline" data-oid="stab0kz">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="djc4c8k">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid="r3x2n_i">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="4e899hc"
                  >
                    <span className="hidden sm:inline" data-oid="vu2fu00">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="x6-1nk5">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="vx78_dn">
                <UserButton data-oid=":kbn.g5" />
                <SignOutButton data-oid="gsu9v0u">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="mlwi0jm"
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

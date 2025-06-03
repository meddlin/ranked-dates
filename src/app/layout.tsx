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
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ranked Dates",
  description: "Track and ideas to make date night easier!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider data-oid="npxd66i">
      <html lang="en" data-oid="ilgau0r">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          data-oid="ycllcqx"
        >
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="tt-cubq"
          >
            <div className="flex items-center" data-oid="q6-hifp">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid="0j5kp56"
              >
                Ranked Dates
              </Link>
            </div>

            <div className="flex-1" data-oid="xd3ze64"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="felc0w4"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="y4z-y6f"
              >
                Home
              </Link>
              <SignedIn data-oid="p2d_vy0">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="nit6ro_"
                >
                  Dashboard
                </Link>
                <Link
                  href="/places"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="a:qgjhq"
                >
                  My Places
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="6l9twcq"
                >
                  Profile
                </Link>
              </SignedIn>
            </nav>

            <div
              className="hidden md:block w-px h-6 bg-gray-300 mx-4"
              data-oid="ncifisb"
            ></div>

            <div className="flex items-center gap-3" data-oid="-lf6qmk">
              <SignedOut data-oid="273-mvx">
                <SignInButton data-oid="l0:46-9">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="sdn3pgb"
                  >
                    <span className="hidden sm:inline" data-oid="55ibal0">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="j_4ez31">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid="0nqf4ex">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="5.h1o20"
                  >
                    <span className="hidden sm:inline" data-oid="5c:7ttf">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="o_aou5l">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="52z3.ct">
                <UserButton data-oid="u965vc8" />
                <SignOutButton data-oid="1r31riz">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="upkjw7o"
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

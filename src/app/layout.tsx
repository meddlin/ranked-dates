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
    <ClerkProvider data-oid="1z0uwf_">
      <html lang="en" data-oid="ztad7nt">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          data-oid="3hdrk_3"
        >
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="n4yp1oj"
          >
            <div className="flex items-center" data-oid="h7ui9:w">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid="9m8p6ag"
              >
                Ranked Dates
              </Link>
            </div>

            <div className="flex-1" data-oid="uco5xhw"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="uwd8jzc"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="hlfi3az"
              >
                Home
              </Link>
              <SignedIn data-oid="fi4_tuc">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="qe_vq2i"
                >
                  Dashboard
                </Link>
                <Link
                  href="/places"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="h25rgm0"
                >
                  My Places
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="72j..92"
                >
                  Profile
                </Link>
              </SignedIn>
            </nav>

            <div
              className="hidden md:block w-px h-6 bg-gray-300 mx-4"
              data-oid="r:mlg3e"
            ></div>

            <div className="flex items-center gap-3" data-oid="fppzhm9">
              <SignedOut data-oid="ravxlpa">
                <SignInButton data-oid="j.:0bf5">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="uowj4zs"
                  >
                    <span className="hidden sm:inline" data-oid="_i3pl6i">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="_2dw:xr">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid="catfi4z">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="p::5_77"
                  >
                    <span className="hidden sm:inline" data-oid="mmosu2f">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="5mxupc7">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="a7l:s0w">
                <UserButton data-oid="snaaknm" />
                <SignOutButton data-oid="4:f_8g5">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="64exfe1"
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

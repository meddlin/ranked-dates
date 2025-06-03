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
    <ClerkProvider data-oid="4288awb">
      <html lang="en" data-oid="x73pbpj">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          data-oid="yyk4x_x"
        >
          <header
            className="flex items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="sfcju2l"
          >
            <div className="flex items-center" data-oid="123gho6">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                data-oid="637_pe1"
              >
                Ranked Dates
              </Link>
            </div>

            <div className="flex-1" data-oid="z:ydgaq"></div>

            <nav
              className="hidden md:flex items-center space-x-8"
              data-oid="nxh_f-h"
            >
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                data-oid="t:afdk8"
              >
                Home
              </Link>
              <SignedIn data-oid="72ze69l">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="syqqu9c"
                >
                  Dashboard
                </Link>
                <Link
                  href="/places"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="m3137my"
                >
                  My Places
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  data-oid="z_-c0g4"
                >
                  Profile
                </Link>
              </SignedIn>
            </nav>

            <div
              className="hidden md:block w-px h-6 bg-gray-300 mx-4"
              data-oid="-tvxr96"
            ></div>

            <div className="flex items-center gap-3" data-oid="q4ukx8.">
              <SignedOut data-oid="a:mo:eg">
                <SignInButton data-oid="sq4lf1l">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="p3v:gp6"
                  >
                    <span className="hidden sm:inline" data-oid="r8k9v3g">
                      Sign In
                    </span>
                    <span className="sm:hidden" data-oid="58hd9zm">
                      In
                    </span>
                  </button>
                </SignInButton>
                <SignUpButton data-oid="jnsaype">
                  <button
                    className="px-3 py-2 md:px-4 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="dv8qpz_"
                  >
                    <span className="hidden sm:inline" data-oid="19z-f.9">
                      Sign Up
                    </span>
                    <span className="sm:hidden" data-oid="4eqm1x0">
                      Up
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="opwcg2f">
                <UserButton data-oid="_:20.un" />
                <SignOutButton data-oid="yae:n9y">
                  <button
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="s2z61x5"
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

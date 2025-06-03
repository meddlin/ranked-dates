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
            className="flex justify-between items-center p-4 gap-4 h-16 bg-white border-b border-gray-200"
            data-oid="sfcju2l"
          >
            <div className="flex items-center" data-oid="123gho6">
              <h1
                className="text-xl font-bold text-gray-900"
                data-oid="cyk.uqu"
              >
                Ranked Dates
              </h1>
            </div>
            <div className="flex items-center gap-3" data-oid="q4ukx8.">
              <SignedOut data-oid="a:mo:eg">
                <SignInButton data-oid="sq4lf1l">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    data-oid="p3v:gp6"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton data-oid="jnsaype">
                  <button
                    className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    data-oid="dv8qpz_"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn data-oid="opwcg2f">
                <UserButton data-oid="_:20.un" />
                <SignOutButton data-oid="yae:n9y">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
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

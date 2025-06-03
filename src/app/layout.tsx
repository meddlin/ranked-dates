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
    <ClerkProvider data-oid=":xmai9h">
      <html lang="en" data-oid="l51xg87">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          data-oid="0hfhw-:"
        >
          <header
            className="flex justify-end items-center p-4 gap-4 h-16"
            data-oid="qt4_syq"
          >
            <SignedOut data-oid="8cy843p">
              <SignInButton data-oid="ueedh.w" />
              <SignUpButton data-oid="nk2wbl." />
            </SignedOut>
            <SignedIn data-oid="v6:7zl4">
              <UserButton data-oid="6xewzd_" />
              <SignOutButton data-oid="bppydah" />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

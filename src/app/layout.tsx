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
            className="flex justify-end items-center p-4 gap-4 h-16"
            data-oid="sfcju2l"
          >
            <SignedOut data-oid="a:mo:eg">
              <SignInButton data-oid="sq4lf1l" />
              <SignUpButton data-oid="jnsaype" />
            </SignedOut>
            <SignedIn data-oid="opwcg2f">
              <UserButton data-oid="_:20.un" />
              <SignOutButton data-oid="yae:n9y" />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

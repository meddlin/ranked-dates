'use client'

import Image from "next/image";
import Link from 'next/link';
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DateIdeasList from "@/components/DateIdeasList";
import { useAppStore } from '@/lib/clientStore';
import NotesDisplay from "@/components/NotesDisplay";

import { useUser } from '@clerk/clerk-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1")
  const previewedItem = useAppStore((state: any) => state.previewedItem);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h2>Landing Page</h2>
      </main>
    </div>
  );
}

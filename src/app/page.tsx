'use client'

import Image from "next/image";
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DateIdeasList from "./components/DateIdeasList";
import { useAppStore } from '@/lib/clientStore';

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1")

  const previewedItem = useAppStore((state: any) => state.previewedItem);
  // const setPreviewedItem = useAppStore((state: any) => state.setPreviewedItem);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="w-full max-w-2xl mx-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tab1">Date Ideas</TabsTrigger>
              <TabsTrigger value="tab2">Restaurants</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="flex flex-row justify-between align-center space-x-16">
                <DateIdeasList
                  title="Date Ideas List"
                  placeholderText="Add a new date idea"
                  list={[
                    { id: '1', content: 'Picnic in the park', notes: 'picnic supplies... ...' },
                    { id: '2', content: 'Visit a museum', notes: 'directions to the museum' },
                    { id: '3', content: 'Cook dinner together', notes: 'we need to pick a recipe' },
                    { id: '4', content: 'Go stargazing', notes: 'where are the dark sky areas?' },
                    { id: '5', content: 'Take a dance class', notes: 'still need to decide on a studio' },
                  ]}
                />
                <div>
                  {previewedItem}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="flex flex-row justify-between align-center space-x-16">
                <DateIdeasList
                  title="Restaurants List"
                  placeholderText="Add a new restaurant"
                  list={[
                    { id: '1', content: 'Interstellar BBQ', notes: 'michelin star BBQ' },
                    { id: '2', content: 'Gibson Street Bar', notes: 'cool place on S. Lamar' },
                    { id: '3', content: 'Odd Duck', notes: 'looks Austin fancy' },
                  ]}
                />
                <div>
                  {previewedItem}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </main>


      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

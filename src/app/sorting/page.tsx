"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DateIdeasList from "@/components/DateIdeasList";
import { useAppStore } from "@/lib/clientStore";
import NotesDisplay from "@/components/NotesDisplay";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [places, setPlaces] = useState([]);

  const previewedItem = useAppStore((state: any) => state.previewedItem);

  const { isLoaded, isSignedIn, user } = useUser();
  console.log("auth user");
  console.log(user);
  console.log(user?.emailAddresses[0].emailAddress);

  useEffect(() => {
    fetch("http://localhost:3000/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

  return (
    <>
      <div
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        data-oid="k:5w3gu"
      >
        <main
          className="flex flex-col gap-8 row-start-2 items-center sm:items-start"
          data-oid="kwl4rny"
        >
          {user && isSignedIn ? (
            <div className="w-full max-w-2xl mx-auto p-4" data-oid="m:vklnz">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
                data-oid=":-i9vz2"
              >
                <TabsList
                  className="grid w-full grid-cols-2"
                  data-oid="ew:spe:"
                >
                  <TabsTrigger value="tab1" data-oid="6cv2d2y">
                    Places
                  </TabsTrigger>
                  <TabsTrigger value="tab2" data-oid="ubrbyo.">
                    Restaurants
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" data-oid="w09k0it">
                  <div
                    className="flex flex-row justify-between align-center space-x-8"
                    data-oid="fwonhm8"
                  >
                    <DateIdeasList
                      title="Places"
                      placeholderText="Add a new date idea"
                      list={places}
                      data-oid="cbpuxa9"
                    />

                    <NotesDisplay
                      notesContent={previewedItem}
                      data-oid="to9h1m0"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="tab2" data-oid="lw4bud6">
                  <div
                    className="flex flex-row justify-between align-center space-x-8"
                    data-oid="e3ywl2t"
                  >
                    <NotesDisplay
                      notesContent={previewedItem}
                      data-oid="gvyo4wt"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <RedirectToSignIn data-oid="am7kuk-" />
          )}
        </main>

        <footer
          className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
          data-oid="zl:1l5i"
        >
          <b data-oid="pvq.cxh">Ranked Dates</b>
        </footer>
      </div>
    </>
  );
}

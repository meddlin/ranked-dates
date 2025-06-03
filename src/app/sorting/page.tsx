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
        data-oid="r6g_a51"
      >
        <main
          className="flex flex-col gap-8 row-start-2 items-center sm:items-start"
          data-oid="e2ofbo2"
        >
          {user && isSignedIn ? (
            <div className="w-full max-w-2xl mx-auto p-4" data-oid="gfpkj:-">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
                data-oid="qw4jmm9"
              >
                <TabsList
                  className="grid w-full grid-cols-2"
                  data-oid="lw69ucb"
                >
                  <TabsTrigger value="tab1" data-oid="8c9p.56">
                    Places
                  </TabsTrigger>
                  <TabsTrigger value="tab2" data-oid="ma5timd">
                    Restaurants
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" data-oid="dujzwa2">
                  <div
                    className="flex flex-row justify-between align-center space-x-8"
                    data-oid="ur2:twe"
                  >
                    <DateIdeasList
                      title="Places"
                      placeholderText="Add a new date idea"
                      list={places}
                      data-oid=":jg69z0"
                    />

                    <NotesDisplay
                      notesContent={previewedItem}
                      data-oid="4p-kt06"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="tab2" data-oid=".jezc8r">
                  <div
                    className="flex flex-row justify-between align-center space-x-8"
                    data-oid="64l3_8j"
                  >
                    <NotesDisplay
                      notesContent={previewedItem}
                      data-oid="agf38al"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <RedirectToSignIn data-oid="s42_blp" />
          )}
        </main>

        <footer
          className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
          data-oid="1jhlp3x"
        >
          <b data-oid="ve7wct.">Ranked Dates</b>
        </footer>
      </div>
    </>
  );
}

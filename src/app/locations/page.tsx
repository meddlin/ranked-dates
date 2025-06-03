"use client";

import {
  ExternalLink,
  MapPin,
  FileText,
  List,
  User,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DateIdea, Place } from "@/types/DateIdea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useUser,
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/clerk-react";

export default function LocationsPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State to track the current view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [data, _setData] = useState<Place[]>([]);

  // Get unique list names for filtering
  const listNames = [...new Set(data.map((item) => item.list))];

  useEffect(() => {
    if (!user) return;

    fetch(`/api/places/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        _setData(data as Place[]);
      });
  }, [user]);

  return (
    <>
      {/* {<span>{user && user.id ? user.id : 'something up with id'}</span>}
        <br />
        {JSON.stringify(user)} */}

      {isSignedIn ? (
        <div className="container mx-auto py-10" data-oid="evmy-9.">
          <div className="flex flex-col space-y-6" data-oid="fdocea9">
            <div className="flex flex-col space-y-2" data-oid="nz8gxzx">
              <h1
                className="text-3xl font-bold tracking-tight"
                data-oid="vqj_uyr"
              >
                Locations
              </h1>
              <p className="text-muted-foreground" data-oid="j:.x9zh">
                Browse and manage your saved locations and places of interest.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-oid="iiwcq:i"
            >
              <div className="w-full max-w-sm" data-oid="9rrbts4">
                <Label htmlFor="search" className="sr-only" data-oid="j4.6.9g">
                  Search
                </Label>
                <Input
                  id="search"
                  placeholder="Search by name or location..."
                  className="w-full"
                  data-oid="wt2cpp_"
                />
              </div>

              <div className="flex items-center gap-4" data-oid="88-4cep">
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) =>
                    value && setViewMode(value as "grid" | "list")
                  }
                  data-oid="w0e5pkr"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    data-oid="01qz5kv"
                  >
                    <LayoutGrid className="h-4 w-4" data-oid="5lbu63b" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    data-oid="afq5:cp"
                  >
                    <LayoutList className="h-4 w-4" data-oid="mnor7ju" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <Tabs defaultValue="all" data-oid="erl1j1w">
              <TabsList data-oid="ny8k8kw">
                <TabsTrigger value="all" data-oid="s4d4_7d">
                  All
                </TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid="he1mflr"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {viewMode === "grid" ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-oid="62906kh"
              >
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden transition-all hover:shadow-md"
                    data-oid="vbm3170"
                  >
                    <CardHeader className="pb-3 border-b" data-oid="rpj5rzb">
                      <div
                        className="flex items-start justify-between"
                        data-oid="diw7he7"
                      >
                        <div className="space-y-1" data-oid="alohzwh">
                          <div
                            className="flex items-center gap-2"
                            data-oid="2akce2c"
                          >
                            <User
                              className="h-4 w-4 text-muted-foreground"
                              data-oid=".7n2xly"
                            />
                            <h3
                              className="font-semibold text-lg"
                              data-oid="7.ow.01"
                            >
                              {item.name}
                            </h3>
                          </div>
                          <div
                            className="flex items-center gap-2"
                            data-oid="dwob5f4"
                          >
                            <MapPin
                              className="h-4 w-4 text-muted-foreground"
                              data-oid="vx_rlf4"
                            />
                            {/* <p className="text-sm text-muted-foreground">{item.location}</p> */}
                            <p
                              className="text-sm text-muted-foreground"
                              data-oid="if4ey:p"
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" data-oid="y1a.0u:">
                          {item.list}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4" data-oid="5u_hv5r">
                      <div className="space-y-4" data-oid="4.wlg_4">
                        <div
                          className="flex items-start gap-2"
                          data-oid=":izf8yc"
                        >
                          <FileText
                            className="h-4 w-4 text-muted-foreground mt-0.5"
                            data-oid="-upwi7d"
                          />
                          <p className="text-sm" data-oid="987njm0">
                            {item.notes}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter
                      className="flex justify-between border-t pt-4"
                      data-oid="_26b5:k"
                    >
                      <div
                        className="flex items-center text-sm text-muted-foreground"
                        data-oid="e.e3tzi"
                      >
                        <List className="h-4 w-4 mr-1" data-oid="5himf3i" />
                        {item.list}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-oid="8:bmx.v"
                      >
                        <Link
                          href={item.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-oid="x:x3e5q"
                        >
                          <MapPin className="h-4 w-4 mr-2" data-oid="4y6yfc0" />
                          View on Maps
                          <ExternalLink
                            className="h-3 w-3 ml-1"
                            data-oid="r-r-:hs"
                          />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4" data-oid="tsb1kkt">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row border rounded-lg p-4 hover:shadow-md transition-all"
                    data-oid="m1vcr1t"
                  >
                    <div className="flex-1 space-y-3" data-oid="l.1bfyo">
                      <div
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        data-oid="m.0omm7"
                      >
                        <div
                          className="flex items-center gap-2"
                          data-oid="4hpd79z"
                        >
                          <User
                            className="h-5 w-5 text-muted-foreground"
                            data-oid="75xdg40"
                          />
                          <h3
                            className="font-semibold text-lg"
                            data-oid="q:r:n_6"
                          >
                            {item.name}
                          </h3>
                        </div>
                        <Badge variant="outline" data-oid="-um0b84">
                          {item.list}
                        </Badge>
                      </div>

                      <div
                        className="flex items-center gap-2"
                        data-oid="cic15mj"
                      >
                        <MapPin
                          className="h-4 w-4 text-muted-foreground"
                          data-oid="92osv3t"
                        />
                        <p
                          className="text-sm text-muted-foreground"
                          data-oid="jtfuyl."
                        >
                          {item.location}
                        </p>
                      </div>

                      <div
                        className="flex items-start gap-2"
                        data-oid="8l:azow"
                      >
                        <FileText
                          className="h-4 w-4 text-muted-foreground mt-0.5"
                          data-oid="y00k95s"
                        />
                        <p className="text-sm" data-oid="bssg_iq">
                          {item.notes}
                        </p>
                      </div>

                      <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t mt-2"
                        data-oid="ir760iz"
                      >
                        <div
                          className="flex items-center text-sm text-muted-foreground"
                          data-oid="feb.vi0"
                        >
                          <List className="h-4 w-4 mr-1" data-oid="il53l2-" />
                          {item.list}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          data-oid="fq2npnb"
                        >
                          <Link
                            href={item.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-oid="qygwd48"
                          >
                            <MapPin
                              className="h-4 w-4 mr-2"
                              data-oid="mfnccc4"
                            />
                            View on Maps
                            <ExternalLink
                              className="h-3 w-3 ml-1"
                              data-oid="4.d_iu1"
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <RedirectToSignIn data-oid="e_o_ars" />
      )}
    </>
  );
}

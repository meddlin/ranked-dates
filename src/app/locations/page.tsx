"use client";

import {
  ExternalLink,
  MapPin,
  FileText,
  List,
  User,
  LayoutGrid,
  LayoutList } from
"lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DateIdea, Place } from "@/types/DateIdea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader } from
"@/components/ui/card";
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
  UserButton } from
"@clerk/clerk-react";

export default function LocationsPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State to track the current view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [data, _setData] = useState<Place[]>([]);

  // Get unique list names for filtering
  const listNames = [...new Set(data.map((item) => item.list))];

  useEffect(() => {
    if (!user) return;

    fetch(`/api/places/${user.id}`).
    then((res) => res.json()).
    then((data) => {
      _setData(data as Place[]);
    });
  }, [user]);

  return (
    <>
      {/* {<span>{user && user.id ? user.id : 'something up with id'}</span>}
                 <br />
                 {JSON.stringify(user)} */}

      {isSignedIn ?
      <div
        className="container mx-auto py-6 px-4 sm:py-10"
        data-oid="shwpmus">

          <div className="flex flex-col space-y-6" data-oid="zz8030.">
            <div className="text-center sm:text-left space-y-3" data-oid="6q3pv4y">
              <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              data-oid="phz8lm4">

                Your Locations
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl" data-oid="qawhl5f">
                Discover and manage your curated collection of favorite places and memorable date spots.
              </p>
              {data.length > 0 &&
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-2" data-oid="ws4k9z7">
                  <span className="flex items-center gap-1" data-oid=":0n2ub7">
                    <MapPin className="h-4 w-4" data-oid="7kc63m8" />
                    {data.length} location{data.length !== 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-1" data-oid="k2_4dnq">
                    <List className="h-4 w-4" data-oid="hvd-3cc" />
                    {listNames.length} list{listNames.length !== 1 ? 's' : ''}
                  </span>
                </div>
            }
            </div>

            <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm"
            data-oid="wn6rhd0">

              <div className="w-full sm:max-w-md" data-oid="rb8a2lt">
                <Label htmlFor="search" className="sr-only" data-oid="3wohto.">
                  Search
                </Label>
                <div className="relative" data-oid="0s_mjrq">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-oid="g41z34x" />
                  <Input
                  id="search"
                  placeholder="Search by name or location..."
                  className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  data-oid=":662:dj" />

                </div>
              </div>

              <div className="flex items-center gap-3" data-oid="v6xy1o:">
                <span className="text-sm text-gray-600 hidden sm:block" data-oid="lld407b">View:</span>
                <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) =>
                value && setViewMode(value as "grid" | "list")
                }
                className="border border-gray-200 rounded-lg p-1"
                data-oid="q2r50_x">

                  <ToggleGroupItem
                  value="grid"
                  aria-label="Grid view"
                  className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                  data-oid="6hlynzh">

                    <LayoutGrid className="h-4 w-4" data-oid=".leqq8n" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                  value="list"
                  aria-label="List view"
                  className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                  data-oid="43eglvq">

                    <LayoutList className="h-4 w-4" data-oid="q33pd82" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <Tabs defaultValue="all" data-oid="1h5n1_-">
              <TabsList data-oid="z.n4v_v">
                <TabsTrigger value="all" data-oid="6tv4myq">
                  All
                </TabsTrigger>
                {listNames.map((list) =>
              <TabsTrigger
                key={list}
                value={list.toLowerCase().replace(/\s+/g, "-")}
                data-oid="yr0ovv2">

                    {list}
                  </TabsTrigger>
              )}
              </TabsList>
            </Tabs>

            <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            data-oid="0nu9m3e">

                {data.length === 0 ?
            <div className="col-span-full" data-oid="stk_p-1">
                    <Card className="border-dashed border-2 border-gray-300" data-oid="gky..k:">
                      <CardContent className="flex flex-col items-center justify-center py-16 text-center" data-oid="05plwbr">
                        <MapPin className="h-16 w-16 text-gray-400 mb-4" data-oid="x473ynv" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2" data-oid="kih2w5o">No locations yet</h3>
                        <p className="text-gray-500 mb-6 max-w-md" data-oid="hmzll5k">
                          Start building your collection of favorite places and date spots.
                        </p>
                        <Button className="bg-orange-500 hover:bg-orange-600" data-oid="jfauri:">
                          Add Your First Location
                        </Button>
                      </CardContent>
                    </Card>
                  </div> :

            data.map((item) =>
            <Card
              key={item.id}
              className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-white"
              data-oid="-zu4ltn">

                      <CardHeader className="pb-4 p-4 sm:p-6" data-oid="rp89iyo">
                        <div
                  className="flex flex-col sm:flex-row items-start justify-between gap-3"
                  data-oid="1-fs0l9">

                          <div className="space-y-2 flex-1 min-w-0" data-oid="26-_uje">
                            <h3
                      className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                      data-oid="x9-arqk">

                              {item.name}
                            </h3>
                            <div
                      className="flex items-start gap-2"
                      data-oid="-7tc98.">

                              <MapPin
                        className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                        data-oid=".ngce2b" />

                              <p
                        className="text-sm text-gray-600 break-words"
                        data-oid="qu816f-">

                                {item.city}, {item.state}
                              </p>
                            </div>
                          </div>
                          <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200 flex-shrink-0 font-medium"
                    data-oid="_usknii">

                            {item.list}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      {item.notes &&
              <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0" data-oid="-r8pjyu">
                          <div className="bg-gray-50 rounded-lg p-3" data-oid="b5jec.u">
                            <div
                    className="flex items-start gap-2"
                    data-oid="b6elqp1">

                              <FileText
                      className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                      data-oid="b-87t0m" />

                              <p className="text-sm text-gray-700 leading-relaxed break-words" data-oid="b.jeh3g">
                                {item.notes}
                              </p>
                            </div>
                          </div>
                        </CardContent>
              }
                      
                      <CardFooter
                className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
                data-oid="zus._-k">

                        <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                  data-oid="5.utgj5">

                          <Link
                    href={item.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    data-oid="3j2yn-5">

                            <MapPin className="h-4 w-4 group-hover/button:text-orange-600" data-oid="rm5zig6" />
                            <span className="font-medium" data-oid="g04ti7f">View on Maps</span>
                            <ExternalLink
                      className="h-3 w-3 group-hover/button:text-orange-600"
                      data-oid="u_u08cu" />

                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
            )
            }
              </div>
            ) : (
              <div className="flex flex-col space-y-4" data-oid="f-bdbio">
                {data.map((item) =>
            <div
              key={item.id}
              className="flex flex-col sm:flex-row border rounded-lg p-4 hover:shadow-md transition-all"
              data-oid="l37u40f">

                    <div className="flex-1 space-y-3" data-oid="8__9fp9">
                      <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  data-oid="k:w-0.t">

                        <div
                    className="flex items-center gap-2"
                    data-oid="xk1gj9o">

                          <User
                      className="h-5 w-5 text-muted-foreground"
                      data-oid="d:.-vk_" />


                          <h3
                      className="font-semibold text-lg"
                      data-oid="roi_nk2">

                            {item.name}
                          </h3>
                        </div>
                        <Badge variant="outline" data-oid="lb9n8w-">
                          {item.list}
                        </Badge>
                      </div>

                      <div
                  className="flex items-center gap-2"
                  data-oid="03lwdsc">

                        <MapPin
                    className="h-4 w-4 text-muted-foreground"
                    data-oid="lq06hwp" />


                        <p
                    className="text-sm text-muted-foreground"
                    data-oid="n97jkzl">

                          {item.location}
                        </p>
                      </div>

                      <div
                  className="flex items-start gap-2"
                  data-oid="wsuip03">

                        <FileText
                    className="h-4 w-4 text-muted-foreground mt-0.5"
                    data-oid="3b:ijl5" />


                        <p className="text-sm" data-oid="jz_5u.g">
                          {item.notes}
                        </p>
                      </div>

                      <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t mt-2"
                  data-oid="3m14z33">

                        <div
                    className="flex items-center text-sm text-muted-foreground"
                    data-oid=":nuddgw">

                          <List className="h-4 w-4 mr-1" data-oid="5:m1cv3" />
                          {item.list}
                        </div>
                        <Button
                    variant="outline"
                    size="sm"
                    asChild
                    data-oid="_vum9r9">

                          <Link
                      href={item.google_maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-oid="_flqvx_">

                            <MapPin
                        className="h-4 w-4 mr-2"
                        data-oid="yaz:jg4" />

                            View on Maps
                            <ExternalLink
                        className="h-3 w-3 ml-1"
                        data-oid="6r9giyk" />

                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
            )}
              </div>
            )}
          </div>
        </div> :

      <RedirectToSignIn data-oid="95f8nhv" />
      }
    </>);

}
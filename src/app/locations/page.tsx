"use client";

import {
  ExternalLink,
  MapPin,
  FileText,
  List,
  User,
  LayoutGrid,
  LayoutList,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  Copy,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Quick action handlers
  const handleEdit = (item: Place) => {
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit location:", item);
  };

  const handleDelete = (item: Place) => {
    // TODO: Show confirmation dialog and delete
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      console.log("Delete location:", item);
      // Remove from state for now
      _setData(data.filter((location) => location.id !== item.id));
    }
  };

  const handleToggleFavorite = (item: Place) => {
    // TODO: Toggle favorite status
    console.log("Toggle favorite:", item);
  };

  const handleCopyLocation = (item: Place) => {
    const locationText = `${item.name} - ${item.city}, ${item.state}`;
    navigator.clipboard.writeText(locationText);
    // TODO: Show toast notification
    console.log("Copied to clipboard:", locationText);
  };

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
        <div
          className="container mx-auto py-6 px-4 sm:py-10"
          data-oid="j42xctn"
        >
          <div className="flex flex-col space-y-6" data-oid="htcm63m">
            <div
              className="text-center sm:text-left space-y-3"
              data-oid="lebngzb"
            >
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                data-oid="zlxpf42"
              >
                Your Locations
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl" data-oid="isbnire">
                Discover and manage your curated collection of favorite places
                and memorable date spots.
              </p>
              {data.length > 0 && (
                <div
                  className="flex items-center gap-4 text-sm text-gray-500 pt-2"
                  data-oid="u0v-uni"
                >
                  <span className="flex items-center gap-1" data-oid="r:m.t01">
                    <MapPin className="h-4 w-4" data-oid="g4r9-s0" />
                    {data.length} location{data.length !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1" data-oid="oehh1mi">
                    <List className="h-4 w-4" data-oid="3v:agn." />
                    {listNames.length} list{listNames.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm"
              data-oid="rqn1kkk"
            >
              <div className="w-full sm:max-w-md" data-oid="cwvhm0q">
                <Label htmlFor="search" className="sr-only" data-oid=":ux2oxw">
                  Search
                </Label>
                <div className="relative" data-oid="-cjdu-g">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    data-oid="m0k_ymw"
                  />

                  <Input
                    id="search"
                    placeholder="Search by name or location..."
                    className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                    data-oid=":j510d2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3" data-oid="pjxibjn">
                <span
                  className="text-sm text-gray-600 hidden sm:block"
                  data-oid="j_u5ilr"
                >
                  View:
                </span>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) =>
                    value && setViewMode(value as "grid" | "list")
                  }
                  className="border border-gray-200 rounded-lg p-1"
                  data-oid="7qicb5a"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid="b4868t3"
                  >
                    <LayoutGrid className="h-4 w-4" data-oid="pmo4wm0" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid="fxw0w8h"
                  >
                    <LayoutList className="h-4 w-4" data-oid="_f23qp9" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <Tabs defaultValue="all" data-oid="c2rw.un">
              <TabsList data-oid="yq.9kax">
                <TabsTrigger value="all" data-oid="x7i6s__">
                  All
                </TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid="-p9af34"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              data-oid="gw.jmn0"
            >
              {data.length === 0 ? (
                <div className="col-span-full" data-oid="3hvj:w0">
                  <Card
                    className="border-dashed border-2 border-gray-300"
                    data-oid="97myuqy"
                  >
                    <CardContent
                      className="flex flex-col items-center justify-center py-16 text-center"
                      data-oid="d3_a10w"
                    >
                      <MapPin
                        className="h-16 w-16 text-gray-400 mb-4"
                        data-oid="s5w1m4:"
                      />

                      <h3
                        className="text-xl font-semibold text-gray-600 mb-2"
                        data-oid="gxesbze"
                      >
                        No locations yet
                      </h3>
                      <p
                        className="text-gray-500 mb-6 max-w-md"
                        data-oid="huoa7-n"
                      >
                        Start building your collection of favorite places and
                        date spots.
                      </p>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        data-oid="s3y8m_c"
                      >
                        Add Your First Location
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                data.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-white"
                    data-oid="typtmd1"
                  >
                    <CardHeader className="pb-4 p-4 sm:p-6" data-oid="azfa.2c">
                      <div
                        className="flex flex-col sm:flex-row items-start justify-between gap-3"
                        data-oid="irxa7g."
                      >
                        <div
                          className="space-y-2 flex-1 min-w-0"
                          data-oid="xdu55ua"
                        >
                          <h3
                            className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                            data-oid=":v5cev_"
                          >
                            {item.name}
                          </h3>
                          <div
                            className="flex items-start gap-2"
                            data-oid="sruba69"
                          >
                            <MapPin
                              className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                              data-oid="0j:i9w1"
                            />

                            <p
                              className="text-sm text-gray-600 break-words"
                              data-oid="r.1ix.m"
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 hover:bg-orange-200 flex-shrink-0 font-medium"
                          data-oid="xhrwtku"
                        >
                          {item.list}
                        </Badge>
                      </div>
                    </CardHeader>

                    {item.notes && (
                      <CardContent
                        className="pt-0 p-4 sm:p-6 sm:pt-0"
                        data-oid="k2lc3db"
                      >
                        <div
                          className="bg-gray-50 rounded-lg p-3"
                          data-oid="uq_435m"
                        >
                          <div
                            className="flex items-start gap-2"
                            data-oid="uma4c:6"
                          >
                            <FileText
                              className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                              data-oid="ih1:dk6"
                            />

                            <p
                              className="text-sm text-gray-700 leading-relaxed break-words"
                              data-oid="d1u_44j"
                            >
                              {item.notes}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    )}

                    <CardFooter
                      className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
                      data-oid="z_5b9us"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                        data-oid="-6-e0zo"
                      >
                        <Link
                          href={item.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                          data-oid="8hp819l"
                        >
                          <MapPin
                            className="h-4 w-4 group-hover/button:text-orange-600"
                            data-oid="wbmo2dw"
                          />

                          <span className="font-medium" data-oid="58f22bv">
                            View on Maps
                          </span>
                          <ExternalLink
                            className="h-3 w-3 group-hover/button:text-orange-600"
                            data-oid="5q_kv:w"
                          />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
            {/* ) : (
            <div className="flex flex-col space-y-4" data-oid="f-bdbio">
            {data.map((item) => (
            <div
             key={item.id}
             className="flex flex-col sm:flex-row border rounded-lg p-4 hover:shadow-md transition-all"
             data-oid="l37u40f"
            >
             <div className="flex-1 space-y-3" data-oid="8__9fp9">
               <div
                 className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                 data-oid="k:w-0.t"
               >
                 <div
                   className="flex items-center gap-2"
                   data-oid="xk1gj9o"
                 >
                   <User
                     className="h-5 w-5 text-muted-foreground"
                     data-oid="d:.-vk_"
                   />
                    <h3
                     className="font-semibold text-lg"
                     data-oid="roi_nk2"
                   >
                     {item.name}
                   </h3>
                 </div>
                 <Badge variant="outline" data-oid="lb9n8w-">
                   {item.list}
                 </Badge>
               </div>
                <div className="flex items-center gap-2" data-oid="03lwdsc">
                 <MapPin
                   className="h-4 w-4 text-muted-foreground"
                   data-oid="lq06hwp"
                 />
                  <p
                   className="text-sm text-muted-foreground"
                   data-oid="n97jkzl"
                 >
                   {item.location}
                 </p>
               </div>
                <div className="flex items-start gap-2" data-oid="wsuip03">
                 <FileText
                   className="h-4 w-4 text-muted-foreground mt-0.5"
                   data-oid="3b:ijl5"
                 />
                  <p className="text-sm" data-oid="jz_5u.g">
                   {item.notes}
                 </p>
               </div>
                <div
                 className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t mt-2"
                 data-oid="3m14z33"
               >
                 <div
                   className="flex items-center text-sm text-muted-foreground"
                   data-oid=":nuddgw"
                 >
                   <List className="h-4 w-4 mr-1" data-oid="5:m1cv3" />
                   {item.list}
                 </div>
                 <Button
                   variant="outline"
                   size="sm"
                   asChild
                   data-oid="_vum9r9"
                 >
                   <Link
                     href={item.google_maps_link}
                     target="_blank"
                     rel="noopener noreferrer"
                     data-oid="_flqvx_"
                   >
                     <MapPin className="h-4 w-4 mr-2" data-oid="yaz:jg4" />
                     View on Maps
                     <ExternalLink
                       className="h-3 w-3 ml-1"
                       data-oid="6r9giyk"
                     />
                   </Link>
                 </Button>
               </div>
             </div>
            </div>
            ))}
            </div>
            ) */}
          </div>
        </div>
      ) : (
        <RedirectToSignIn data-oid="3hy16m_" />
      )}
    </>
  );
}

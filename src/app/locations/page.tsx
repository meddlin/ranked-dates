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
          data-oid="pm2:c8g"
        >
          <div className="flex flex-col space-y-6" data-oid="u65i-pr">
            <div
              className="text-center sm:text-left space-y-3"
              data-oid="akb_nud"
            >
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                data-oid="wuigr.e"
              >
                Your Locations
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl" data-oid="5gnnajn">
                Discover and manage your curated collection of favorite places
                and memorable date spots.
              </p>
              {data.length > 0 && (
                <div
                  className="flex items-center gap-4 text-sm text-gray-500 pt-2"
                  data-oid="p39b4in"
                >
                  <span className="flex items-center gap-1" data-oid="c8rkr0_">
                    <MapPin className="h-4 w-4" data-oid="yp5tlst" />
                    {data.length} location{data.length !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1" data-oid="wv5mvqo">
                    <List className="h-4 w-4" data-oid="0tu81yu" />
                    {listNames.length} list{listNames.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm"
              data-oid="9yalf-1"
            >
              <div className="w-full sm:max-w-md" data-oid=".b3yti5">
                <Label htmlFor="search" className="sr-only" data-oid="gwqr7de">
                  Search
                </Label>
                <div className="relative" data-oid="71rkz-a">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    data-oid="16yk6l4"
                  />

                  <Input
                    id="search"
                    placeholder="Search by name or location..."
                    className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                    data-oid="qvaiann"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3" data-oid="wpw0ukt">
                <span
                  className="text-sm text-gray-600 hidden sm:block"
                  data-oid="2vzkjre"
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
                  data-oid="mjeiozb"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid="ap3swd7"
                  >
                    <LayoutGrid className="h-4 w-4" data-oid="wsiypy_" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid=".n7ahfu"
                  >
                    <LayoutList className="h-4 w-4" data-oid="hy:8:dk" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <Tabs defaultValue="all" data-oid="fv5vg7q">
              <TabsList data-oid="7e_w73y">
                <TabsTrigger value="all" data-oid="9jx46:4">
                  All
                </TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid="3aalk7t"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {data.length === 0 ? (
              <div className="col-span-full" data-oid="_g_81.6">
                <Card
                  className="border-dashed border-2 border-gray-300"
                  data-oid="kmwifs:"
                >
                  <CardContent
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-oid="f0olviw"
                  >
                    <MapPin
                      className="h-16 w-16 text-gray-400 mb-4"
                      data-oid="v4l6d01"
                    />

                    <h3
                      className="text-xl font-semibold text-gray-600 mb-2"
                      data-oid="thoxrnq"
                    >
                      No locations yet
                    </h3>
                    <p
                      className="text-gray-500 mb-6 max-w-md"
                      data-oid="28cyy87"
                    >
                      Start building your collection of favorite places and date
                      spots.
                    </p>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      data-oid="e0axlr2"
                    >
                      Add Your First Location
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : viewMode === "grid" ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                data-oid="jq7mem-"
              >
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-white"
                    data-oid="gilfl30"
                  >
                    <CardHeader className="pb-4 p-4 sm:p-6" data-oid="_p54ewh">
                      <div
                        className="flex items-start justify-between gap-3"
                        data-oid="_e8vonw"
                      >
                        <div
                          className="space-y-2 flex-1 min-w-0"
                          data-oid="qj726d9"
                        >
                          <h3
                            className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                            data-oid=":04nbeg"
                          >
                            {item.name}
                          </h3>
                          <div
                            className="flex items-start gap-2"
                            data-oid="719eebn"
                          >
                            <MapPin
                              className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                              data-oid="a1wyjrq"
                            />

                            <p
                              className="text-sm text-gray-600 break-words"
                              data-oid="5wz35lr"
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>
                        </div>

                        <div
                          className="flex items-center gap-2 flex-shrink-0"
                          data-oid="1qim43w"
                        >
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
                            data-oid="nxi6hih"
                          >
                            {item.list}
                          </Badge>

                          <DropdownMenu data-oid="qag7m96">
                            <DropdownMenuTrigger asChild data-oid="9ibh5qg">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                data-oid="frdkruj"
                              >
                                <MoreVertical
                                  className="h-4 w-4"
                                  data-oid="yk2egn7"
                                />

                                <span className="sr-only" data-oid="r7lrlm6">
                                  Open menu
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48"
                              data-oid="xejwk1p"
                            >
                              <DropdownMenuItem
                                onClick={() => handleEdit(item)}
                                data-oid=":gw:10p"
                              >
                                <Edit
                                  className="h-4 w-4 mr-2"
                                  data-oid="_e_5h1p"
                                />
                                Edit location
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCopyLocation(item)}
                                data-oid="vy3.0og"
                              >
                                <Copy
                                  className="h-4 w-4 mr-2"
                                  data-oid="tst288-"
                                />
                                Copy details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFavorite(item)}
                                data-oid="mw6c706"
                              >
                                <Star
                                  className="h-4 w-4 mr-2"
                                  data-oid="u1zj._2"
                                />
                                Add to favorites
                              </DropdownMenuItem>
                              <DropdownMenuSeparator data-oid="ddnmvr5" />
                              <DropdownMenuItem
                                onClick={() => handleDelete(item)}
                                className="text-red-600 focus:text-red-600"
                                data-oid="7:cm2ji"
                              >
                                <Trash2
                                  className="h-4 w-4 mr-2"
                                  data-oid="vb468.5"
                                />
                                Delete location
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>

                    {item.notes && (
                      <CardContent
                        className="pt-0 p-4 sm:p-6 sm:pt-0"
                        data-oid="my04ekx"
                      >
                        <div
                          className="bg-gray-50 rounded-lg p-3"
                          data-oid="k.jjjwr"
                        >
                          <div
                            className="flex items-start gap-2"
                            data-oid="jwwn_.4"
                          >
                            <FileText
                              className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                              data-oid="61wznkk"
                            />

                            <p
                              className="text-sm text-gray-700 leading-relaxed break-words"
                              data-oid="y5pdk_7"
                            >
                              {item.notes}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    )}

                    <CardFooter
                      className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
                      data-oid="1ophj3."
                    >
                      <div className="flex gap-2 w-full" data-oid="u9d6pce">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="flex-1 bg-white hover:bg-gray-50 transition-all"
                          data-oid="kw39l3l"
                        >
                          <Edit className="h-4 w-4 mr-2" data-oid="ro1-_:t" />
                          <span className="hidden sm:inline" data-oid="reve6z6">
                            Edit
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1 bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                          data-oid="o9tvc2m"
                        >
                          <Link
                            href={item.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                            data-oid="l-ed5x:"
                          >
                            <MapPin
                              className="h-4 w-4 group-hover/button:text-orange-600"
                              data-oid=".p7i3a:"
                            />

                            <span
                              className="font-medium hidden sm:inline"
                              data-oid="1ezdu:5"
                            >
                              Maps
                            </span>
                            <ExternalLink
                              className="h-3 w-3 group-hover/button:text-orange-600"
                              data-oid="qz3jyyn"
                            />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4" data-oid="kr2yqj9">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden transition-all duration-200 hover:shadow-md border-0 shadow-sm bg-white"
                    data-oid="jfbla7f"
                  >
                    <CardContent className="p-4 sm:p-6" data-oid="_617ikc">
                      <div
                        className="flex flex-col sm:flex-row items-start justify-between gap-4"
                        data-oid="gao1wdd"
                      >
                        <div className="flex-1 space-y-3" data-oid="mpopd-k">
                          <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            data-oid="kpgamit"
                          >
                            <div
                              className="flex items-center gap-2"
                              data-oid="4sj4a:1"
                            >
                              <h3
                                className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                                data-oid="mqj5ofu"
                              >
                                {item.name}
                              </h3>
                            </div>
                            <div
                              className="flex items-center gap-2"
                              data-oid="uz9ujbo"
                            >
                              <Badge
                                variant="secondary"
                                className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
                                data-oid="zd8y4re"
                              >
                                {item.list}
                              </Badge>

                              <DropdownMenu data-oid="w9zz4j:">
                                <DropdownMenuTrigger asChild data-oid="m3oo0cz">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    data-oid="62:c-0c"
                                  >
                                    <MoreVertical
                                      className="h-4 w-4"
                                      data-oid="q-xuyc:"
                                    />

                                    <span
                                      className="sr-only"
                                      data-oid="ssto7kj"
                                    >
                                      Open menu
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                  data-oid="x5edg6-"
                                >
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(item)}
                                    data-oid="t0_63ms"
                                  >
                                    <Edit
                                      className="h-4 w-4 mr-2"
                                      data-oid="tg58_i5"
                                    />
                                    Edit location
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleCopyLocation(item)}
                                    data-oid="om_t5po"
                                  >
                                    <Copy
                                      className="h-4 w-4 mr-2"
                                      data-oid="tsif7j8"
                                    />
                                    Copy details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleToggleFavorite(item)}
                                    data-oid="4u1.e1_"
                                  >
                                    <Star
                                      className="h-4 w-4 mr-2"
                                      data-oid="k1q5bux"
                                    />
                                    Add to favorites
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator data-oid="iblwvh:" />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 focus:text-red-600"
                                    data-oid=".wymysk"
                                  >
                                    <Trash2
                                      className="h-4 w-4 mr-2"
                                      data-oid="i.7elfj"
                                    />
                                    Delete location
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div
                            className="flex items-start gap-2"
                            data-oid="mqawp85"
                          >
                            <MapPin
                              className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                              data-oid="kfdmh3k"
                            />

                            <p
                              className="text-sm text-gray-600 break-words"
                              data-oid="aeqtdo."
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>

                          {item.notes && (
                            <div
                              className="flex items-start gap-2"
                              data-oid="yi6jab."
                            >
                              <FileText
                                className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                                data-oid="ahnh0kd"
                              />

                              <p
                                className="text-sm text-gray-700 leading-relaxed break-words"
                                data-oid="a5mpbsh"
                              >
                                {item.notes}
                              </p>
                            </div>
                          )}

                          <div
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t"
                            data-oid=".n20oh0"
                          >
                            <div
                              className="flex items-center text-sm text-gray-500"
                              data-oid="ezz3g4q"
                            >
                              <List
                                className="h-4 w-4 mr-1"
                                data-oid="s33qmdn"
                              />

                              {item.list}
                            </div>
                            <div className="flex gap-2" data-oid="7z9saso">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                className="bg-white hover:bg-gray-50 transition-all"
                                data-oid="xmr76df"
                              >
                                <Edit
                                  className="h-4 w-4 mr-2"
                                  data-oid="3fj-rfn"
                                />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                                data-oid="sme4-m4"
                              >
                                <Link
                                  href={item.google_maps_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                  data-oid="geu8.zq"
                                >
                                  <MapPin
                                    className="h-4 w-4 group-hover/button:text-orange-600"
                                    data-oid="lvbh.c6"
                                  />
                                  View on Maps
                                  <ExternalLink
                                    className="h-3 w-3 group-hover/button:text-orange-600"
                                    data-oid="v.q.3ho"
                                  />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <RedirectToSignIn data-oid="0s7eru5" />
      )}
    </>
  );
}

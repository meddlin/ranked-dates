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
        <div
          className="container mx-auto py-6 px-4 sm:py-10"
          data-oid="shwpmus"
        >
          <div className="flex flex-col space-y-6" data-oid="zz8030.">
            <div className="flex flex-col space-y-2" data-oid="6q3pv4y">
              <h1
                className="text-3xl font-bold tracking-tight"
                data-oid="phz8lm4"
              >
                Locations
              </h1>
              <p className="text-muted-foreground" data-oid="qawhl5f">
                Browse and manage your saved locations and places of interest.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-oid="wn6rhd0"
            >
              <div className="w-full sm:max-w-sm" data-oid="rb8a2lt">
                <Label htmlFor="search" className="sr-only" data-oid="3wohto.">
                  Search
                </Label>
                <Input
                  id="search"
                  placeholder="Search by name or location..."
                  className="w-full"
                  data-oid=":662:dj"
                />
              </div>

              <div className="flex items-center gap-4" data-oid="v6xy1o:">
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) =>
                    value && setViewMode(value as "grid" | "list")
                  }
                  data-oid="q2r50_x"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    data-oid="6hlynzh"
                  >
                    <LayoutGrid className="h-4 w-4" data-oid=".leqq8n" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    data-oid="43eglvq"
                  >
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
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid="yr0ovv2"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {viewMode === "grid" ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-oid="0nu9m3e"
              >
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden transition-all hover:shadow-md"
                    data-oid="-zu4ltn"
                  >
                    <CardHeader className="pb-3 border-b" data-oid="rp89iyo">
                      <div
                        className="flex items-start justify-between"
                        data-oid="1-fs0l9"
                      >
                        <div className="space-y-1" data-oid="26-_uje">
                          <div
                            className="flex items-center gap-2"
                            data-oid="-mf7mjj"
                          >
                            <User
                              className="h-4 w-4 text-muted-foreground"
                              data-oid="onf47ul"
                            />

                            <h3
                              className="font-semibold text-lg"
                              data-oid="x9-arqk"
                            >
                              {item.name}
                            </h3>
                          </div>
                          <div
                            className="flex items-center gap-2"
                            data-oid="-7tc98."
                          >
                            <MapPin
                              className="h-4 w-4 text-muted-foreground"
                              data-oid=".ngce2b"
                            />

                            {/* <p className="text-sm text-muted-foreground">{item.location}</p> */}
                            <p
                              className="text-sm text-muted-foreground"
                              data-oid="qu816f-"
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" data-oid="_usknii">
                          {item.list}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4" data-oid="-r8pjyu">
                      <div className="space-y-4" data-oid="b5jec.u">
                        <div
                          className="flex items-start gap-2"
                          data-oid="b6elqp1"
                        >
                          <FileText
                            className="h-4 w-4 text-muted-foreground mt-0.5"
                            data-oid="b-87t0m"
                          />

                          <p className="text-sm" data-oid="b.jeh3g">
                            {item.notes}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter
                      className="flex justify-between border-t pt-4"
                      data-oid="zus._-k"
                    >
                      <div
                        className="flex items-center text-sm text-muted-foreground"
                        data-oid="6q2i3t6"
                      >
                        <List className="h-4 w-4 mr-1" data-oid="krmqv.2" />
                        {item.list}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-oid="5.utgj5"
                      >
                        <Link
                          href={item.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-oid="3j2yn-5"
                        >
                          <MapPin className="h-4 w-4 mr-2" data-oid="rm5zig6" />
                          View on Maps
                          <ExternalLink
                            className="h-3 w-3 ml-1"
                            data-oid="u_u08cu"
                          />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
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

                      <div
                        className="flex items-center gap-2"
                        data-oid="03lwdsc"
                      >
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

                      <div
                        className="flex items-start gap-2"
                        data-oid="wsuip03"
                      >
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
                            <MapPin
                              className="h-4 w-4 mr-2"
                              data-oid="yaz:jg4"
                            />
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
            )}
          </div>
        </div>
      ) : (
        <RedirectToSignIn data-oid="95f8nhv" />
      )}
    </>
  );
}

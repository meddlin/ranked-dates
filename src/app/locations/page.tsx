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
  Save,
  X,
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function LocationsPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State to track the current view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [data, _setData] = useState<Place[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Place>>({});

  // Get unique list names for filtering
  const listNames = [...new Set(data.map((item) => item.list))];

  // Quick action handlers
  const handleEdit = (item: Place) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      city: item.city,
      state: item.state,
      notes: item.notes,
      list: item.list,
      google_maps_link: item.google_maps_link,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = (itemId: string) => {
    // Update the item in the data array
    /**
     * Replace this with a save to the database
     */
    // _setData(
    //   data.map((item) =>
    //     item.id === itemId ? { ...item, ...editForm } : item,
    //   ),
    // );

    // TODO: Send update to API
    console.log("Saving edit:", editForm);

    // Reset editing state
    setEditingId(null);
    setEditForm({});
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
      {isSignedIn ? (
        <div
          className="container mx-auto py-6 px-4 sm:py-10"
          data-oid="-xvj.-8"
        >
          <div className="flex flex-col space-y-6" data-oid="kzpcx:j">
            <div
              className="text-center sm:text-left space-y-3"
              data-oid=".k7s4t-"
            >
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                data-oid="t-_soeb"
              >
                Your Locations
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl" data-oid="6_1dry-">
                Discover and manage your curated collection of favorite places
                and memorable date spots.
              </p>
              {data.length > 0 && (
                <div
                  className="flex items-center gap-4 text-sm text-gray-500 pt-2"
                  data-oid="6ylllc3"
                >
                  <span className="flex items-center gap-1" data-oid="lg68jhg">
                    <MapPin className="h-4 w-4" data-oid="enlre0i" />
                    {data.length} location{data.length !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1" data-oid="dh5seyu">
                    <List className="h-4 w-4" data-oid="kasacbw" />
                    {listNames.length} list{listNames.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm"
              data-oid="7-f4jl2"
            >
              <div className="w-full sm:max-w-md" data-oid="8:fv._b">
                <Label htmlFor="search" className="sr-only" data-oid=".-y-zif">
                  Search
                </Label>
                <div className="relative" data-oid="e:0f7ss">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    data-oid="zi1cyto"
                  />

                  <Input
                    id="search"
                    placeholder="Search by name or location..."
                    className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                    data-oid="ck_ndfz"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3" data-oid="c2xtevh">
                <span
                  className="text-sm text-gray-600 hidden sm:block"
                  data-oid="faquf9y"
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
                  data-oid="iv4l83v"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid="7vg575z"
                  >
                    <LayoutGrid className="h-4 w-4" data-oid="fhpfaxs" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
                    data-oid="qw5v_c6"
                  >
                    <LayoutList className="h-4 w-4" data-oid="_90ym_d" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <Tabs defaultValue="all" data-oid="ait8212">
              <TabsList data-oid="_v.1i:3">
                <TabsTrigger value="all" data-oid="tbd.vg7">
                  All
                </TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid="7p3ji.v"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {data.length === 0 ? (
              <div className="col-span-full" data-oid="ls1hio2">
                <Card
                  className="border-dashed border-2 border-gray-300"
                  data-oid="z94yu9i"
                >
                  <CardContent
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-oid="666ru.."
                  >
                    <MapPin
                      className="h-16 w-16 text-gray-400 mb-4"
                      data-oid="tghaihu"
                    />

                    <h3
                      className="text-xl font-semibold text-gray-600 mb-2"
                      data-oid="7-.nt60"
                    >
                      No locations yet
                    </h3>
                    <p
                      className="text-gray-500 mb-6 max-w-md"
                      data-oid="nq8hm7z"
                    >
                      Start building your collection of favorite places and date
                      spots.
                    </p>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      data-oid="2rtypsm"
                    >
                      Add Your First Location
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : viewMode === "grid" ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                data-oid="fq6e4d-"
              >
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className={`group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white ${
                      editingId === item.id
                        ? "ring-2 ring-orange-200 shadow-lg"
                        : "hover:shadow-lg hover:-translate-y-1"
                    }`}
                    data-oid="y4pgpol"
                  >
                    {editingId === item.id ? (
                      // Edit Form
                      <>
                        <CardHeader
                          className="pb-4 p-4 sm:p-6 bg-orange-50"
                          data-oid=":c7v.v2"
                        >
                          <div
                            className="flex items-center justify-between"
                            data-oid="83y4yt."
                          >
                            <h3
                              className="font-semibold text-lg text-gray-900"
                              data-oid="e7d:79s"
                            >
                              Edit Location
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelEdit}
                              className="h-8 w-8 p-0"
                              data-oid="gcnn9ay"
                            >
                              <X className="h-4 w-4" data-oid="ok-os5c" />
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent
                          className="p-4 sm:p-6 space-y-4"
                          data-oid="1k_rej5"
                        >
                          <div className="space-y-2" data-oid="5i2slos">
                            <Label
                              htmlFor={`name-${item.id}`}
                              className="text-sm font-medium"
                              data-oid="_kqdk0y"
                            >
                              Location Name
                            </Label>
                            <Input
                              id={`name-${item.id}`}
                              value={editForm.name || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Enter location name"
                              className="w-full"
                              data-oid="jmgrw2d"
                            />
                          </div>

                          <div
                            className="grid grid-cols-2 gap-3"
                            data-oid="fh8bn7h"
                          >
                            <div className="space-y-2" data-oid="wuctq21">
                              <Label
                                htmlFor={`city-${item.id}`}
                                className="text-sm font-medium"
                                data-oid="34:9x.b"
                              >
                                City
                              </Label>
                              <Input
                                id={`city-${item.id}`}
                                value={editForm.city || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    city: e.target.value,
                                  })
                                }
                                placeholder="City"
                                data-oid="_1zyxt-"
                              />
                            </div>
                            <div className="space-y-2" data-oid="0d23mbp">
                              <Label
                                htmlFor={`state-${item.id}`}
                                className="text-sm font-medium"
                                data-oid="fc-yj3j"
                              >
                                State
                              </Label>
                              <Select
                                value={editForm.state || ""}
                                onValueChange={(value) =>
                                  setEditForm({
                                    ...editForm,
                                    state: value,
                                  })
                                }
                                data-oid="5e:u9cm"
                              >
                                <SelectTrigger data-oid="ctxvz79">
                                  <SelectValue
                                    placeholder="Select state"
                                    data-oid="4ky:9r3"
                                  />
                                </SelectTrigger>
                                <SelectContent data-oid="e8rtimh">
                                  {US_STATES.map((state) => (
                                    <SelectItem
                                      key={state}
                                      value={state}
                                      data-oid="-szxkwt"
                                    >
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2" data-oid="f6_5pi3">
                            <Label
                              htmlFor={`list-${item.id}`}
                              className="text-sm font-medium"
                              data-oid="k278c8b"
                            >
                              List
                            </Label>
                            <Input
                              id={`list-${item.id}`}
                              value={editForm.list || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  list: e.target.value,
                                })
                              }
                              placeholder="List name"
                              data-oid="9g6wcwl"
                            />
                          </div>

                          <div className="space-y-2" data-oid="92czza.">
                            <Label
                              htmlFor={`notes-${item.id}`}
                              className="text-sm font-medium"
                              data-oid="ls128ew"
                            >
                              Notes
                            </Label>
                            <Textarea
                              id={`notes-${item.id}`}
                              value={editForm.notes || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Add notes about this location..."
                              rows={3}
                              className="resize-none"
                              data-oid="3.qk6yf"
                            />
                          </div>

                          <div className="space-y-2" data-oid="782tuv9">
                            <Label
                              htmlFor={`maps-${item.id}`}
                              className="text-sm font-medium"
                              data-oid="glbh62t"
                            >
                              Google Maps Link
                            </Label>
                            <Input
                              id={`maps-${item.id}`}
                              value={editForm.google_maps_link || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  google_maps_link: e.target.value,
                                })
                              }
                              placeholder="https://maps.google.com/..."
                              type="url"
                              data-oid="nxs8bly"
                            />
                          </div>
                        </CardContent>

                        <CardFooter
                          className="bg-gray-50 p-4 sm:p-6"
                          data-oid="604cnk8"
                        >
                          <div className="flex gap-2 w-full" data-oid="mzxz:wt">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                              className="flex-1"
                              data-oid="52qjrpp"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(item.id)}
                              className="flex-1 bg-orange-500 hover:bg-orange-600"
                              data-oid="ylrrw30"
                            >
                              <Save
                                className="h-4 w-4 mr-2"
                                data-oid="5.o7qr0"
                              />
                              Save Changes
                            </Button>
                          </div>
                        </CardFooter>
                      </>
                    ) : (
                      // Display Mode
                      <>
                        <CardHeader
                          className="pb-4 p-4 sm:p-6"
                          data-oid="ioh8ycn"
                        >
                          <div
                            className="flex items-start justify-between gap-3"
                            data-oid="af:_c-q"
                          >
                            <div
                              className="space-y-2 flex-1 min-w-0"
                              data-oid="63hf1u1"
                            >
                              <h3
                                className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                                data-oid="ron_37s"
                              >
                                {item.name}
                              </h3>
                              <div
                                className="flex items-start gap-2"
                                data-oid="qt04tt6"
                              >
                                <MapPin
                                  className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                                  data-oid="jsncs6t"
                                />

                                <p
                                  className="text-sm text-gray-600 break-words"
                                  data-oid="ym_-vyc"
                                >
                                  {item.city}, {item.state}
                                </p>
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-2 flex-shrink-0"
                              data-oid="55ai3r2"
                            >
                              <Badge
                                variant="secondary"
                                className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
                                data-oid=":vaffqy"
                              >
                                {item.list}
                              </Badge>

                              <DropdownMenu data-oid="j0rz9:s">
                                <DropdownMenuTrigger asChild data-oid="l90t:lu">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    data-oid="p8e0-wk"
                                  >
                                    <MoreVertical
                                      className="h-4 w-4"
                                      data-oid="gk42elr"
                                    />

                                    <span
                                      className="sr-only"
                                      data-oid="axycqmi"
                                    >
                                      Open menu
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                  data-oid="cecv1s8"
                                >
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(item)}
                                    data-oid="kjlk:1b"
                                  >
                                    <Edit
                                      className="h-4 w-4 mr-2"
                                      data-oid="a:qgqrq"
                                    />
                                    Edit location
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleCopyLocation(item)}
                                    data-oid="9moivg6"
                                  >
                                    <Copy
                                      className="h-4 w-4 mr-2"
                                      data-oid="y_r.vm5"
                                    />
                                    Copy details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleToggleFavorite(item)}
                                    data-oid="h1_75rq"
                                  >
                                    <Star
                                      className="h-4 w-4 mr-2"
                                      data-oid="qg9lzc."
                                    />
                                    Add to favorites
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator data-oid="xrq81tf" />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 focus:text-red-600"
                                    data-oid="r4v8-nm"
                                  >
                                    <Trash2
                                      className="h-4 w-4 mr-2"
                                      data-oid="1xgrdb7"
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
                            data-oid="hkmi90a"
                          >
                            <div
                              className="bg-gray-50 rounded-lg p-3"
                              data-oid="-c6mhli"
                            >
                              <div
                                className="flex items-start gap-2"
                                data-oid="u:winm9"
                              >
                                <FileText
                                  className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                                  data-oid="1e-dg9f"
                                />

                                <p
                                  className="text-sm text-gray-700 leading-relaxed break-words"
                                  data-oid="w:ov.6u"
                                >
                                  {item.notes}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        )}

                        <CardFooter
                          className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
                          data-oid="ga2t5xq"
                        >
                          <div className="flex gap-2 w-full" data-oid="hm5ker9">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              className="flex-1 bg-white hover:bg-gray-50 transition-all"
                              data-oid="i0t8wez"
                            >
                              <Edit
                                className="h-4 w-4 mr-2"
                                data-oid="nxcvqmr"
                              />

                              <span
                                className="hidden sm:inline"
                                data-oid="9cmxpez"
                              >
                                Edit
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="flex-1 bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                              data-oid="g_2rrea"
                            >
                              <Link
                                href={item.google_maps_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                                data-oid="yox:mn."
                              >
                                <MapPin
                                  className="h-4 w-4 group-hover/button:text-orange-600"
                                  data-oid="0y_yh2y"
                                />

                                <span
                                  className="font-medium hidden sm:inline"
                                  data-oid="o5h6579"
                                >
                                  Maps
                                </span>
                                <ExternalLink
                                  className="h-3 w-3 group-hover/button:text-orange-600"
                                  data-oid="a0sptkf"
                                />
                              </Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4" data-oid="mjdyqcj">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden transition-all duration-200 hover:shadow-md border-0 shadow-sm bg-white"
                    data-oid="94uoz62"
                  >
                    <CardContent className="p-4 sm:p-6" data-oid="nsjnt-6">
                      <div
                        className="flex flex-col sm:flex-row items-start justify-between gap-4"
                        data-oid="6xypo7d"
                      >
                        <div className="flex-1 space-y-3" data-oid="mggtnc.">
                          <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            data-oid="uz9cbb1"
                          >
                            <div
                              className="flex items-center gap-2"
                              data-oid="3f-twqh"
                            >
                              <h3
                                className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
                                data-oid="zcpjc:r"
                              >
                                {item.name}
                              </h3>
                            </div>
                            <div
                              className="flex items-center gap-2"
                              data-oid="0a9-2q0"
                            >
                              <Badge
                                variant="secondary"
                                className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
                                data-oid="ivwn61_"
                              >
                                {item.list}
                              </Badge>

                              <DropdownMenu data-oid="tdspyc5">
                                <DropdownMenuTrigger asChild data-oid="uppb4r6">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    data-oid="3uwkvt9"
                                  >
                                    <MoreVertical
                                      className="h-4 w-4"
                                      data-oid="omli368"
                                    />

                                    <span
                                      className="sr-only"
                                      data-oid=".l2.syh"
                                    >
                                      Open menu
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                  data-oid="q7_9b7q"
                                >
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(item)}
                                    data-oid="qde1ygj"
                                  >
                                    <Edit
                                      className="h-4 w-4 mr-2"
                                      data-oid="5rgtde9"
                                    />
                                    Edit location
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleCopyLocation(item)}
                                    data-oid="mdmvifv"
                                  >
                                    <Copy
                                      className="h-4 w-4 mr-2"
                                      data-oid="b048_g8"
                                    />
                                    Copy details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleToggleFavorite(item)}
                                    data-oid="m7w1a6:"
                                  >
                                    <Star
                                      className="h-4 w-4 mr-2"
                                      data-oid="wyir2sv"
                                    />
                                    Add to favorites
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator data-oid="la33ngc" />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 focus:text-red-600"
                                    data-oid="lplqoq_"
                                  >
                                    <Trash2
                                      className="h-4 w-4 mr-2"
                                      data-oid="vvia61n"
                                    />
                                    Delete location
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div
                            className="flex items-start gap-2"
                            data-oid="krnjm-4"
                          >
                            <MapPin
                              className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                              data-oid="199j2ci"
                            />

                            <p
                              className="text-sm text-gray-600 break-words"
                              data-oid="g5vp67r"
                            >
                              {item.city}, {item.state}
                            </p>
                          </div>

                          {item.notes && (
                            <div
                              className="flex items-start gap-2"
                              data-oid=".ka8udf"
                            >
                              <FileText
                                className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                                data-oid="er13n62"
                              />

                              <p
                                className="text-sm text-gray-700 leading-relaxed break-words"
                                data-oid="a92niwx"
                              >
                                {item.notes}
                              </p>
                            </div>
                          )}

                          <div
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t"
                            data-oid="dops3sx"
                          >
                            <div
                              className="flex items-center text-sm text-gray-500"
                              data-oid="rouyn1h"
                            >
                              <List
                                className="h-4 w-4 mr-1"
                                data-oid="f4jsv2k"
                              />

                              {item.list}
                            </div>
                            <div className="flex gap-2" data-oid="z2qt3a5">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                className="bg-white hover:bg-gray-50 transition-all"
                                data-oid="_h-9ti_"
                              >
                                <Edit
                                  className="h-4 w-4 mr-2"
                                  data-oid="kivfyjq"
                                />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
                                data-oid="6dif88n"
                              >
                                <Link
                                  href={item.google_maps_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                  data-oid="rg5d-cf"
                                >
                                  <MapPin
                                    className="h-4 w-4 group-hover/button:text-orange-600"
                                    data-oid="3r-ypby"
                                  />
                                  View on Maps
                                  <ExternalLink
                                    className="h-3 w-3 group-hover/button:text-orange-600"
                                    data-oid="t8mfjxi"
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
        <RedirectToSignIn data-oid="foumlmr" />
      )}
    </>
  );
}

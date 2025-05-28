"use client"

import { ExternalLink, MapPin, FileText, List, User, LayoutGrid, LayoutList } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DateIdea, Place } from "@/types/DateIdea";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
    useUser,
    ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from '@clerk/clerk-react';

// Sample data - replace with your actual data source
const locations = [
    {
        id: 1,
        name: "Central Park",
        location: "New York, NY",
        googleMapsLink: "https://maps.google.com/?q=Central+Park+New+York",
        notes:
            "Beautiful park with lots of walking trails and recreational areas. Great for picnics and outdoor activities.",
        listName: "Parks & Recreation",
    },
    {
        id: 2,
        name: "Golden Gate Bridge",
        location: "San Francisco, CA",
        googleMapsLink: "https://maps.google.com/?q=Golden+Gate+Bridge+San+Francisco",
        notes:
            "Iconic suspension bridge spanning the Golden Gate strait. Offers stunning views of the bay and city skyline.",
        listName: "Landmarks",
    },
    {
        id: 3,
        name: "Pike Place Market",
        location: "Seattle, WA",
        googleMapsLink: "https://maps.google.com/?q=Pike+Place+Market+Seattle",
        notes: "Historic farmers market with local vendors, crafts, and the original Starbucks location.",
        listName: "Shopping",
    },
    {
        id: 4,
        name: "The High Line",
        location: "New York, NY",
        googleMapsLink: "https://maps.google.com/?q=The+High+Line+New+York",
        notes:
            "Elevated linear park built on a former railroad track. Features gardens, art installations, and city views.",
        listName: "Parks & Recreation",
    },
    {
        id: 5,
        name: "Millennium Park",
        location: "Chicago, IL",
        googleMapsLink: "https://maps.google.com/?q=Millennium+Park+Chicago",
        notes: "Public park featuring the famous Cloud Gate sculpture (The Bean) and other modern art installations.",
        listName: "Parks & Recreation",
    },
    {
        id: 6,
        name: "Space Needle",
        location: "Seattle, WA",
        googleMapsLink: "https://maps.google.com/?q=Space+Needle+Seattle",
        notes: "Iconic observation tower offering panoramic views of the city and surrounding mountains.",
        listName: "Landmarks",
    },
]

export default function LocationsPage() {
    const { isLoaded, isSignedIn, user } = useUser();

    // State to track the current view mode (grid or list)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [data, _setData] = useState<Place[]>([]);

    // Get unique list names for filtering
    const listNames = [...new Set(data.map((item) => item.list))]

    useEffect(() => {
        fetch('http://localhost:3000/api/places')
            .then((res) => res.json())
            .then((data) => {
                _setData(data as Place[])
            })
    }, [])

    return (
        <>
            {isSignedIn ? (
                <div className="container mx-auto py-10">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
                            <p className="text-muted-foreground">Browse and manage your saved locations and places of interest.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="w-full max-w-sm">
                                <Label htmlFor="search" className="sr-only">
                                    Search
                                </Label>
                                <Input id="search" placeholder="Search by name or location..." className="w-full" />
                            </div>

                            <div className="flex items-center gap-4">
                                <ToggleGroup
                                    type="single"
                                    value={viewMode}
                                    onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                                >
                                    <ToggleGroupItem value="grid" aria-label="Grid view">
                                        <LayoutGrid className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="list" aria-label="List view">
                                        <LayoutList className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>

                        <Tabs defaultValue="all">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                {listNames.map((list) => (
                                    <TabsTrigger key={list} value={list.toLowerCase().replace(/\s+/g, "-")}>
                                        {list}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.map((item) => (
                                    <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                                        <CardHeader className="pb-3 border-b">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        <p className="text-sm text-muted-foreground">{item.location}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">{item.list}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <p className="text-sm">{item.notes}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between border-t pt-4">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <List className="h-4 w-4 mr-1" />
                                                {item.list}
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={item.google_maps_link} target="_blank" rel="noopener noreferrer">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    View on Maps
                                                    <ExternalLink className="h-3 w-3 ml-1" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                {data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row border rounded-lg p-4 hover:shadow-md transition-all"
                                    >
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                </div>
                                                <Badge variant="outline">{item.list}</Badge>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">{item.location}</p>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                <p className="text-sm">{item.notes}</p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t mt-2">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <List className="h-4 w-4 mr-1" />
                                                    {item.list}
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={item.google_maps_link} target="_blank" rel="noopener noreferrer">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        View on Maps
                                                        <ExternalLink className="h-3 w-3 ml-1" />
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
            ) : (<RedirectToSignIn />)}
        </>
    )
}

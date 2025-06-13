import { MapPin, List, Heart } from "lucide-react";
import { Place } from "@/types/DateIdea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LocationsHeaderProps {
  data: Place[];
  listNames: string[];
}

export function LocationsHeader({ data, listNames }: LocationsHeaderProps) {
  return (
    <div className="text-center sm:text-left space-y-3">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        Your Locations
      </h1>
      <div className="space-y-4">
        <p className="text-gray-600 text-lg max-w-2xl">
          Discover and manage your curated collection of favorite places and
          memorable date spots.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/sorting">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Heart className="h-4 w-4 mr-2" />
              Create Date Ideas
            </Button>
          </Link>
          <p className="text-sm text-gray-500 self-center">
            Turn your saved locations into ranked date ideas
          </p>
        </div>
      </div>
      {data.length > 0 && (
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {data.length} location{data.length !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <List className="h-4 w-4" />
            {listNames.length} list{listNames.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}

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
    <div className="text-center sm:text-left space-y-3" data-oid="weh6n6-">
      <h1
        className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        data-oid="2l4t1ff"
      >
        Your Locations
      </h1>
      <div className="space-y-4" data-oid="h1yzgy9">
        <p className="text-gray-600 text-lg max-w-2xl" data-oid="o9bjfb-">
          Discover and manage your curated collection of favorite places and
          memorable date spots.
        </p>

        <div className="flex flex-col sm:flex-row gap-3" data-oid="rr0tkz:">
          <Link href="/sorting" data-oid="za5a85i">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-oid=".jq.:hr"
            >
              <Heart className="h-4 w-4 mr-2" data-oid="f4hskrt" />
              Create Date Ideas
            </Button>
          </Link>
          <p className="text-sm text-gray-500 self-center" data-oid="lxiy7xr">
            Turn your saved locations into ranked date ideas
          </p>
        </div>
      </div>
      {data.length > 0 && (
        <div
          className="flex items-center gap-4 text-sm text-gray-500 pt-2"
          data-oid="qbmtpj."
        >
          <span className="flex items-center gap-1" data-oid="oi36r5v">
            <MapPin className="h-4 w-4" data-oid="8zwz8z." />
            {data.length} location{data.length !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1" data-oid=":7jfpzz">
            <List className="h-4 w-4" data-oid="28hs1y0" />
            {listNames.length} list{listNames.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}

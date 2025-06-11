import { MapPin, List } from "lucide-react";
import { Place } from "@/types/DateIdea";

interface LocationsHeaderProps {
  data: Place[];
  listNames: string[];
}

export function LocationsHeader({ data, listNames }: LocationsHeaderProps) {
  return (
    <div className="text-center sm:text-left space-y-3" data-oid="d-se41b">
      <h1
        className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        data-oid="a3d9798"
      >
        Your Locations
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl" data-oid="g1.2-15">
        Discover and manage your curated collection of favorite places and
        memorable date spots.
      </p>
      {data.length > 0 && (
        <div
          className="flex items-center gap-4 text-sm text-gray-500 pt-2"
          data-oid="zq70gzo"
        >
          <span className="flex items-center gap-1" data-oid="kcrek00">
            <MapPin className="h-4 w-4" data-oid="iyxci7c" />
            {data.length} location{data.length !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1" data-oid=":7vpx35">
            <List className="h-4 w-4" data-oid="1i0xgbn" />
            {listNames.length} list{listNames.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}

import { MapPin, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface LocationsControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onSearch: (query: string) => void;
}

export function LocationsControls({
  viewMode,
  onViewModeChange,
  onSearch,
}: LocationsControlsProps) {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm"
      data-oid="ds9ui:2"
    >
      <div className="w-full sm:max-w-md" data-oid="di67.n8">
        <Label htmlFor="search" className="sr-only" data-oid="2pwcscm">
          Search
        </Label>
        <div className="relative" data-oid="pkf:px_">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            data-oid="sf3-h27"
          />

          <Input
            id="search"
            placeholder="Search by name or location..."
            className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
            onChange={(e) => onSearch(e.target.value)}
            data-oid=":.aus0-"
          />
        </div>
      </div>

      <div className="flex items-center gap-3" data-oid="ddvatlv">
        <span
          className="text-sm text-gray-600 hidden sm:block"
          data-oid="5.uot:s"
        >
          View:
        </span>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) =>
            value && onViewModeChange(value as "grid" | "list")
          }
          className="border border-gray-200 rounded-lg p-1"
          data-oid="ctzu03j"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
            data-oid="ya6aryf"
          >
            <LayoutGrid className="h-4 w-4" data-oid="7lmnrar" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
            data-oid="6kguxe8"
          >
            <LayoutList className="h-4 w-4" data-oid="i0.0k2k" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

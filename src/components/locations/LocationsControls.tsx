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
      data-oid="b0p22oq"
    >
      <div className="w-full sm:max-w-md" data-oid="s6yxf_o">
        <Label htmlFor="search" className="sr-only" data-oid="i2a94j4">
          Search
        </Label>
        <div className="relative" data-oid="627uedm">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            data-oid="d84dsqg"
          />

          <Input
            id="search"
            placeholder="Search by name or location..."
            className="w-full pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
            onChange={(e) => onSearch(e.target.value)}
            data-oid="gcvv.uw"
          />
        </div>
      </div>

      <div className="flex items-center gap-3" data-oid="40g75k8">
        <span
          className="text-sm text-gray-600 hidden sm:block"
          data-oid="ia.8zcb"
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
          data-oid="_yad25w"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
            data-oid="cz-zyxs"
          >
            <LayoutGrid className="h-4 w-4" data-oid="ukw1jny" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700"
            data-oid="oz13se-"
          >
            <LayoutList className="h-4 w-4" data-oid="4s1:rrr" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

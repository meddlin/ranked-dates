import { X, Save } from "lucide-react";
import { Place } from "@/types/DateIdea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface LocationEditFormProps {
  item: Place;
  editForm: Partial<Place>;
  onEditFormChange: (updates: Partial<Place>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function LocationEditForm({
  item,
  editForm,
  onEditFormChange,
  onSave,
  onCancel,
}: LocationEditFormProps) {
  return (
    <Card
      className="group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white ring-2 ring-orange-200 shadow-lg"
      data-oid=":y_47.."
    >
      <CardHeader className="pb-4 p-4 sm:p-6 bg-orange-50" data-oid="nfnbx.q">
        <div className="flex items-center justify-between" data-oid="74zxo.g">
          <h3
            className="font-semibold text-lg text-gray-900"
            data-oid="ftaxch6"
          >
            Edit Location
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
            data-oid="r6xw80v"
          >
            <X className="h-4 w-4" data-oid="irdo924" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4" data-oid="36swrce">
        <div className="space-y-2" data-oid="bm7v23w">
          <Label
            htmlFor={`name-${item.id}`}
            className="text-sm font-medium"
            data-oid="f-:pdw0"
          >
            Location Name
          </Label>
          <Input
            id={`name-${item.id}`}
            value={editForm.name || ""}
            onChange={(e) => onEditFormChange({ name: e.target.value })}
            placeholder="Enter location name"
            className="w-full"
            data-oid="o..-:57"
          />
        </div>

        <div className="grid grid-cols-2 gap-3" data-oid="a08y:od">
          <div className="space-y-2" data-oid="fwifffi">
            <Label
              htmlFor={`city-${item.id}`}
              className="text-sm font-medium"
              data-oid="7gv6mfp"
            >
              City
            </Label>
            <Input
              id={`city-${item.id}`}
              value={editForm.city || ""}
              onChange={(e) => onEditFormChange({ city: e.target.value })}
              placeholder="City"
              data-oid="od2j2rs"
            />
          </div>
          <div className="space-y-2" data-oid="7q863f-">
            <Label
              htmlFor={`state-${item.id}`}
              className="text-sm font-medium"
              data-oid="r2tzig1"
            >
              State
            </Label>
            <Select
              value={editForm.state || ""}
              onValueChange={(value) => onEditFormChange({ state: value })}
              data-oid="la22fc."
            >
              <SelectTrigger data-oid="_gsgqwq">
                <SelectValue placeholder="Select state" data-oid="hmkeu60" />
              </SelectTrigger>
              <SelectContent data-oid="v_u5nb-">
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state} data-oid="vx4l7ej">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2" data-oid="8g0vmiu">
          <Label
            htmlFor={`list-${item.id}`}
            className="text-sm font-medium"
            data-oid="--9q3yp"
          >
            List
          </Label>
          <Input
            id={`list-${item.id}`}
            value={editForm.list || ""}
            onChange={(e) => onEditFormChange({ list: e.target.value })}
            placeholder="List name"
            data-oid="jgnxrvy"
          />
        </div>

        <div className="space-y-2" data-oid="t7ktpl7">
          <Label
            htmlFor={`notes-${item.id}`}
            className="text-sm font-medium"
            data-oid="mp-9:u-"
          >
            Notes
          </Label>
          <Textarea
            id={`notes-${item.id}`}
            value={editForm.notes || ""}
            onChange={(e) => onEditFormChange({ notes: e.target.value })}
            placeholder="Add notes about this location..."
            rows={3}
            className="resize-none"
            data-oid="9i5vi8e"
          />
        </div>

        <div className="space-y-2" data-oid="8_8c410">
          <Label
            htmlFor={`maps-${item.id}`}
            className="text-sm font-medium"
            data-oid=".abwwnk"
          >
            Google Maps Link
          </Label>
          <Input
            id={`maps-${item.id}`}
            value={editForm.google_maps_link || ""}
            onChange={(e) =>
              onEditFormChange({ google_maps_link: e.target.value })
            }
            placeholder="https://maps.google.com/..."
            type="url"
            data-oid="yf.l_ai"
          />
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 sm:p-6" data-oid="wawmq:d">
        <div className="flex gap-2 w-full" data-oid="ucjnvnd">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="flex-1"
            data-oid="221iig0"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            data-oid="qgq3wwk"
          >
            <Save className="h-4 w-4 mr-2" data-oid="hz:-wls" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

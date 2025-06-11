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
      data-oid="pt1v1ws"
    >
      <CardHeader className="pb-4 p-4 sm:p-6 bg-orange-50" data-oid="0kvl:a8">
        <div className="flex items-center justify-between" data-oid="9iss-o7">
          <h3
            className="font-semibold text-lg text-gray-900"
            data-oid="oo1-n2o"
          >
            Edit Location
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
            data-oid="ivfig7h"
          >
            <X className="h-4 w-4" data-oid="fxs2j1r" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4" data-oid="sk.2ycb">
        <div className="space-y-2" data-oid="jr7eo3x">
          <Label
            htmlFor={`name-${item.id}`}
            className="text-sm font-medium"
            data-oid="4m0oucr"
          >
            Location Name
          </Label>
          <Input
            id={`name-${item.id}`}
            value={editForm.name || ""}
            onChange={(e) => onEditFormChange({ name: e.target.value })}
            placeholder="Enter location name"
            className="w-full"
            data-oid="y3dtvg8"
          />
        </div>

        <div className="grid grid-cols-2 gap-3" data-oid="trwhyx-">
          <div className="space-y-2" data-oid="px792cu">
            <Label
              htmlFor={`city-${item.id}`}
              className="text-sm font-medium"
              data-oid="de9:aw8"
            >
              City
            </Label>
            <Input
              id={`city-${item.id}`}
              value={editForm.city || ""}
              onChange={(e) => onEditFormChange({ city: e.target.value })}
              placeholder="City"
              data-oid="x_hnptm"
            />
          </div>
          <div className="space-y-2" data-oid="jb7.2dd">
            <Label
              htmlFor={`state-${item.id}`}
              className="text-sm font-medium"
              data-oid="q1mzbee"
            >
              State
            </Label>
            <Select
              value={editForm.state || ""}
              onValueChange={(value) => onEditFormChange({ state: value })}
              data-oid="w413-22"
            >
              <SelectTrigger data-oid="wzy_9my">
                <SelectValue placeholder="Select state" data-oid="qy4h6uf" />
              </SelectTrigger>
              <SelectContent data-oid="ih1eape">
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state} data-oid="hbw8sl7">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2" data-oid="fpzd50s">
          <Label
            htmlFor={`list-${item.id}`}
            className="text-sm font-medium"
            data-oid="3vl-x7i"
          >
            List
          </Label>
          <Input
            id={`list-${item.id}`}
            value={editForm.list || ""}
            onChange={(e) => onEditFormChange({ list: e.target.value })}
            placeholder="List name"
            data-oid="g5tnh2:"
          />
        </div>

        <div className="space-y-2" data-oid="o:l72mv">
          <Label
            htmlFor={`notes-${item.id}`}
            className="text-sm font-medium"
            data-oid="ta3zuo:"
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
            data-oid="73-d17q"
          />
        </div>

        <div className="space-y-2" data-oid="yi5oog8">
          <Label
            htmlFor={`maps-${item.id}`}
            className="text-sm font-medium"
            data-oid="7:kmxa."
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
            data-oid="q60-tp3"
          />
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 sm:p-6" data-oid="dk4hv2_">
        <div className="flex gap-2 w-full" data-oid="ysuxz-s">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="flex-1"
            data-oid="8le5dwe"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            data-oid="7:0yv-k"
          >
            <Save className="h-4 w-4 mr-2" data-oid="ilrq_-a" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

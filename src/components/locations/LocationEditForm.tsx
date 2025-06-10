import { X, Save } from "lucide-react";
import { Place } from "@/types/DateIdea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
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
    <Card className="group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white ring-2 ring-orange-200 shadow-lg">
      <CardHeader className="pb-4 p-4 sm:p-6 bg-orange-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900">Edit Location</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${item.id}`} className="text-sm font-medium">
            Location Name
          </Label>
          <Input
            id={`name-${item.id}`}
            value={editForm.name || ""}
            onChange={(e) => onEditFormChange({ name: e.target.value })}
            placeholder="Enter location name"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor={`city-${item.id}`} className="text-sm font-medium">
              City
            </Label>
            <Input
              id={`city-${item.id}`}
              value={editForm.city || ""}
              onChange={(e) => onEditFormChange({ city: e.target.value })}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`state-${item.id}`} className="text-sm font-medium">
              State
            </Label>
            <Select
              value={editForm.state || ""}
              onValueChange={(value) => onEditFormChange({ state: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`list-${item.id}`} className="text-sm font-medium">
            List
          </Label>
          <Input
            id={`list-${item.id}`}
            value={editForm.list || ""}
            onChange={(e) => onEditFormChange({ list: e.target.value })}
            placeholder="List name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`notes-${item.id}`} className="text-sm font-medium">
            Notes
          </Label>
          <Textarea
            id={`notes-${item.id}`}
            value={editForm.notes || ""}
            onChange={(e) => onEditFormChange({ notes: e.target.value })}
            placeholder="Add notes about this location..."
            rows={3}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`maps-${item.id}`} className="text-sm font-medium">
            Google Maps Link
          </Label>
          <Input
            id={`maps-${item.id}`}
            value={editForm.google_maps_link || ""}
            onChange={(e) => onEditFormChange({ google_maps_link: e.target.value })}
            placeholder="https://maps.google.com/..."
            type="url"
          />
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 sm:p-6">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
import { X, Save, Plus } from "lucide-react";
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

interface LocationCreateFormProps {
  createForm: Partial<Place>;
  onCreateFormChange: (updates: Partial<Place>) => void;
  onSave: () => void;
  onCancel: () => void;
  existingLists: string[];
}

export function LocationCreateForm({
  createForm,
  onCreateFormChange,
  onSave,
  onCancel,
  existingLists,
}: LocationCreateFormProps) {
  const isFormValid = createForm.name && createForm.city && createForm.state;

  return (
    <Card
      className="group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white ring-2 ring-green-200 shadow-lg"
      data-oid="create-location-card"
    >
      <CardHeader
        className="pb-4 p-4 sm:p-6 bg-green-50"
        data-oid="create-header"
      >
        <div
          className="flex items-center justify-between"
          data-oid="create-header-content"
        >
          <h3
            className="font-semibold text-lg text-gray-900 flex items-center gap-2"
            data-oid="create-title"
          >
            <Plus className="h-5 w-5 text-green-600" data-oid="iio8tsb" />
            Add New Location
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
            data-oid="create-cancel-x"
          >
            <X className="h-4 w-4" data-oid="g7wxd0c" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4" data-oid="create-content">
        <div className="space-y-2" data-oid="create-name-field">
          <Label
            htmlFor="create-name"
            className="text-sm font-medium"
            data-oid="create-name-label"
          >
            Location Name *
          </Label>
          <Input
            id="create-name"
            value={createForm.name || ""}
            onChange={(e) => onCreateFormChange({ name: e.target.value })}
            placeholder="Enter location name"
            className="w-full"
            data-oid="create-name-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3" data-oid="create-location-grid">
          <div className="space-y-2" data-oid="create-city-field">
            <Label
              htmlFor="create-city"
              className="text-sm font-medium"
              data-oid="create-city-label"
            >
              City *
            </Label>
            <Input
              id="create-city"
              value={createForm.city || ""}
              onChange={(e) => onCreateFormChange({ city: e.target.value })}
              placeholder="City"
              data-oid="create-city-input"
            />
          </div>
          <div className="space-y-2" data-oid="create-state-field">
            <Label
              htmlFor="create-state"
              className="text-sm font-medium"
              data-oid="create-state-label"
            >
              State *
            </Label>
            <Select
              value={createForm.state || ""}
              onValueChange={(value) => onCreateFormChange({ state: value })}
              data-oid="create-state-select"
            >
              <SelectTrigger data-oid="create-state-trigger">
                <SelectValue placeholder="Select state" data-oid=":_:31b." />
              </SelectTrigger>
              <SelectContent data-oid="create-state-content">
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state} data-oid="ceq5yhy">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2" data-oid="create-list-field">
          <Label
            htmlFor="create-list"
            className="text-sm font-medium"
            data-oid="create-list-label"
          >
            List
          </Label>
          <div className="flex gap-2" data-oid="create-list-container">
            <Input
              id="create-list"
              value={createForm.list || ""}
              onChange={(e) => onCreateFormChange({ list: e.target.value })}
              placeholder="Enter list name or select existing"
              className="flex-1"
              data-oid="create-list-input"
            />

            {existingLists.length > 0 && (
              <Select
                value=""
                onValueChange={(value) => onCreateFormChange({ list: value })}
                data-oid="create-list-select"
              >
                <SelectTrigger className="w-32" data-oid="create-list-trigger">
                  <SelectValue placeholder="Existing" data-oid="kv5b7nw" />
                </SelectTrigger>
                <SelectContent data-oid="create-list-content">
                  {existingLists.map((list) => (
                    <SelectItem key={list} value={list} data-oid="ycpssfh">
                      {list}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="space-y-2" data-oid="create-notes-field">
          <Label
            htmlFor="create-notes"
            className="text-sm font-medium"
            data-oid="create-notes-label"
          >
            Notes
          </Label>
          <Textarea
            id="create-notes"
            value={createForm.notes || ""}
            onChange={(e) => onCreateFormChange({ notes: e.target.value })}
            placeholder="Add notes about this location..."
            rows={3}
            className="resize-none"
            data-oid="create-notes-textarea"
          />
        </div>

        <div className="space-y-2" data-oid="create-maps-field">
          <Label
            htmlFor="create-maps"
            className="text-sm font-medium"
            data-oid="create-maps-label"
          >
            Google Maps Link
          </Label>
          <Input
            id="create-maps"
            value={createForm.google_maps_link || ""}
            onChange={(e) =>
              onCreateFormChange({ google_maps_link: e.target.value })
            }
            placeholder="https://maps.google.com/..."
            type="url"
            data-oid="create-maps-input"
          />
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 sm:p-6" data-oid="create-footer">
        <div className="flex gap-2 w-full" data-oid="create-buttons">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="flex-1"
            data-oid="create-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={!isFormValid}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
            data-oid="create-save-btn"
          >
            <Save className="h-4 w-4 mr-2" data-oid="67zi_jb" />
            Add Location
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

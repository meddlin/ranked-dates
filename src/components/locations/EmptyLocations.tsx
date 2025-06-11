import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyLocations() {
  return (
    <div className="col-span-full" data-oid="8zqswj4">
      <Card
        className="border-dashed border-2 border-gray-300"
        data-oid="1l9:kvr"
      >
        <CardContent
          className="flex flex-col items-center justify-center py-16 text-center"
          data-oid="8v74pzp"
        >
          <MapPin className="h-16 w-16 text-gray-400 mb-4" data-oid="42e0ao7" />
          <h3
            className="text-xl font-semibold text-gray-600 mb-2"
            data-oid="qgyu-4g"
          >
            No locations yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md" data-oid="uuiptpm">
            Start building your collection of favorite places and date spots.
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            data-oid=".x7qs2o"
          >
            Add Your First Location
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

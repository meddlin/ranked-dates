import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyLocations() {
  return (
    <div className="col-span-full" data-oid="qx05665">
      <Card
        className="border-dashed border-2 border-gray-300"
        data-oid="w2ba3oo"
      >
        <CardContent
          className="flex flex-col items-center justify-center py-16 text-center"
          data-oid="wmxdpbi"
        >
          <MapPin className="h-16 w-16 text-gray-400 mb-4" data-oid="il1e3.n" />
          <h3
            className="text-xl font-semibold text-gray-600 mb-2"
            data-oid="8_qws3c"
          >
            No locations yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md" data-oid="b5.2hyo">
            Start building your collection of favorite places and date spots.
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            data-oid="33vs_ux"
          >
            Add Your First Location
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

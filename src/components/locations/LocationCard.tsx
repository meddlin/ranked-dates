import {
  MapPin,
  FileText,
  ExternalLink,
  Edit,
  MoreVertical,
  Copy,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Place } from "@/types/DateIdea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationCardProps {
  item: Place;
  onEdit: (item: Place) => void;
  onDelete: (item: Place) => void;
  onToggleFavorite: (item: Place) => void;
  onCopyLocation: (item: Place) => void;
}

export function LocationCard({
  item,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopyLocation,
}: LocationCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-4 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />

              <p className="text-sm text-gray-600 break-words">
                {item.city}, {item.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
            >
              {item.list}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEdit(item)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopyLocation(item)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleFavorite(item)}>
                  <Star className="h-4 w-4 mr-2" />
                  Add to favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(item)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete location
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {item.notes && (
        <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />

              <p className="text-sm text-gray-700 leading-relaxed break-words">
                {item.notes}
              </p>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1 bg-white hover:bg-gray-50 transition-all"
          >
            <Edit className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
          >
            <Link
              href={item.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MapPin className="h-4 w-4 group-hover/button:text-orange-600" />

              <span className="font-medium hidden sm:inline">Maps</span>
              <ExternalLink className="h-3 w-3 group-hover/button:text-orange-600" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

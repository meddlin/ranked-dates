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
    <Card
      className="group overflow-hidden transition-all duration-200 border-0 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1"
      data-oid="3v:usl5"
    >
      <CardHeader className="pb-4 p-4 sm:p-6" data-oid="zaobpmo">
        <div
          className="flex items-start justify-between gap-3"
          data-oid="8:.b.38"
        >
          <div className="space-y-2 flex-1 min-w-0" data-oid="_m7wts.">
            <h3
              className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
              data-oid="yf5paud"
            >
              {item.name}
            </h3>
            <div className="flex items-start gap-2" data-oid="qzrwfz6">
              <MapPin
                className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                data-oid="rmev-:h"
              />

              <p
                className="text-sm text-gray-600 break-words"
                data-oid=":3:2vis"
              >
                {item.city}, {item.state}
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 flex-shrink-0"
            data-oid="vdmta9f"
          >
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
              data-oid="8atkym9"
            >
              {item.list}
            </Badge>

            <DropdownMenu data-oid="ls_krzn">
              <DropdownMenuTrigger asChild data-oid="gn6fq7w">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  data-oid="y5bdia7"
                >
                  <MoreVertical className="h-4 w-4" data-oid="a-4fktd" />
                  <span className="sr-only" data-oid="z:6ss:x">
                    Open menu
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48"
                data-oid="sya--aq"
              >
                <DropdownMenuItem
                  onClick={() => onEdit(item)}
                  data-oid="yum.pxt"
                >
                  <Edit className="h-4 w-4 mr-2" data-oid="by76v2u" />
                  Edit location
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onCopyLocation(item)}
                  data-oid="wg15eos"
                >
                  <Copy className="h-4 w-4 mr-2" data-oid="qtk:4yn" />
                  Copy details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onToggleFavorite(item)}
                  data-oid="7.g38v_"
                >
                  <Star className="h-4 w-4 mr-2" data-oid="eh_8a_a" />
                  Add to favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator data-oid="4_.5meb" />
                <DropdownMenuItem
                  onClick={() => onDelete(item)}
                  className="text-red-600 focus:text-red-600"
                  data-oid="2td_58l"
                >
                  <Trash2 className="h-4 w-4 mr-2" data-oid="3y7qf51" />
                  Delete location
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {item.notes && (
        <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0" data-oid="v3:u6rg">
          <div className="bg-gray-50 rounded-lg p-3" data-oid="dvsiwoe">
            <div className="flex items-start gap-2" data-oid="tusmyqm">
              <FileText
                className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                data-oid="85:bxnf"
              />

              <p
                className="text-sm text-gray-700 leading-relaxed break-words"
                data-oid="0nvefgl"
              >
                {item.notes}
              </p>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter
        className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
        data-oid="d:t.vq8"
      >
        <div className="flex gap-2 w-full" data-oid="mmhwags">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1 bg-white hover:bg-gray-50 transition-all"
            data-oid="q1ubxg-"
          >
            <Edit className="h-4 w-4 mr-2" data-oid="zr5pt9i" />
            <span className="hidden sm:inline" data-oid="h8aerl9">
              Edit
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
            data-oid="ppry6f1"
          >
            <Link
              href={item.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
              data-oid="er:8e:2"
            >
              <MapPin
                className="h-4 w-4 group-hover/button:text-orange-600"
                data-oid="8mk9l._"
              />

              <span className="font-medium hidden sm:inline" data-oid="e35omer">
                Maps
              </span>
              <ExternalLink
                className="h-3 w-3 group-hover/button:text-orange-600"
                data-oid="3ssr81e"
              />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

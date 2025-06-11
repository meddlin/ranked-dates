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
      data-oid="7d13ze3"
    >
      <CardHeader className="pb-4 p-4 sm:p-6" data-oid="ci2lvot">
        <div
          className="flex items-start justify-between gap-3"
          data-oid="7whvz4g"
        >
          <div className="space-y-2 flex-1 min-w-0" data-oid="yzgbs66">
            <h3
              className="font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words group-hover:text-orange-600 transition-colors"
              data-oid="rt6tz-9"
            >
              {item.name}
            </h3>
            <div className="flex items-start gap-2" data-oid="nkwlfxj">
              <MapPin
                className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"
                data-oid="9xkc2ep"
              />

              <p
                className="text-sm text-gray-600 break-words"
                data-oid="jx4tqp8"
              >
                {item.city}, {item.state}
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 flex-shrink-0"
            data-oid="9lyzgwx"
          >
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 hover:bg-orange-200 font-medium"
              data-oid="0.hmgkv"
            >
              {item.list}
            </Badge>

            <DropdownMenu data-oid="v66u6cf">
              <DropdownMenuTrigger asChild data-oid="xhbn-.u">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  data-oid="foxf4k3"
                >
                  <MoreVertical className="h-4 w-4" data-oid="arr26jl" />
                  <span className="sr-only" data-oid="6w795qy">
                    Open menu
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48"
                data-oid="wo_u-ua"
              >
                <DropdownMenuItem
                  onClick={() => onEdit(item)}
                  data-oid="::tj1ip"
                >
                  <Edit className="h-4 w-4 mr-2" data-oid="j_jx.62" />
                  Edit location
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onCopyLocation(item)}
                  data-oid="khg6mgf"
                >
                  <Copy className="h-4 w-4 mr-2" data-oid="etd1fv0" />
                  Copy details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onToggleFavorite(item)}
                  data-oid="hslr5:."
                >
                  <Star className="h-4 w-4 mr-2" data-oid="u.r00a:" />
                  Add to favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator data-oid="k02epo4" />
                <DropdownMenuItem
                  onClick={() => onDelete(item)}
                  className="text-red-600 focus:text-red-600"
                  data-oid="0pty363"
                >
                  <Trash2 className="h-4 w-4 mr-2" data-oid="2p.t06j" />
                  Delete location
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {item.notes && (
        <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0" data-oid="r8.aw:q">
          <div className="bg-gray-50 rounded-lg p-3" data-oid="lotbiub">
            <div className="flex items-start gap-2" data-oid="uexct6.">
              <FileText
                className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0"
                data-oid="7cfdabw"
              />

              <p
                className="text-sm text-gray-700 leading-relaxed break-words"
                data-oid="tu5fs3k"
              >
                {item.notes}
              </p>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter
        className="bg-gray-50/50 border-t-0 pt-4 p-4 sm:p-6"
        data-oid="oy9ozbu"
      >
        <div className="flex gap-2 w-full" data-oid="szbfnlm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1 bg-white hover:bg-gray-50 transition-all"
            data-oid="z8hd.93"
          >
            <Edit className="h-4 w-4 mr-2" data-oid="cq3sz:u" />
            <span className="hidden sm:inline" data-oid="g4h1_7g">
              Edit
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all group/button"
            data-oid="g_itt6l"
          >
            <Link
              href={item.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
              data-oid="w1k3orw"
            >
              <MapPin
                className="h-4 w-4 group-hover/button:text-orange-600"
                data-oid="_ab9l35"
              />

              <span className="font-medium hidden sm:inline" data-oid="lcyx5-r">
                Maps
              </span>
              <ExternalLink
                className="h-3 w-3 group-hover/button:text-orange-600"
                data-oid="13ey48_"
              />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

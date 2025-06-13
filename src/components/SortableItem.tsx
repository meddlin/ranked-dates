import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Delete } from "lucide-react";
import { useAppStore } from "@/lib/clientStore";

interface SortableItemProps {
  id: string;
  index: number;
  notes: string;
  children: React.ReactNode;
}

export function SortableItem({
  id,
  index,
  notes,
  children,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const setPreviewedItem = useAppStore((state: any) => state.setPreviewedItem);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-x-2 p-2 bg-gray-100 rounded"
      onMouseEnter={() => setPreviewedItem(notes)}
      data-oid="y3r81.e"
    >
      <span className="font-semibold w-6 text-center" data-oid="yck93_d">
        {index}
      </span>
      <button
        {...listeners}
        className="cursor-move p-1 hover:bg-gray-200 rounded"
        aria-label={`Reorder ${children}`}
        data-oid="jm3s8ue"
      >
        <GripVertical size={16} data-oid="7gxqqou" />
      </button>
      <span className="flex-grow" data-oid="ie9xv0s">
        {children}
      </span>
      <button onClick={() => alert("clicked delete")} data-oid="cgl8oc_">
        <Delete size={16} data-oid="xtc04hl" />
      </button>
    </li>
  );
}

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
      data-oid="mlzd7w3"
    >
      <span className="font-semibold w-6 text-center" data-oid="u.-qtz:">
        {index}
      </span>
      <button
        {...listeners}
        className="cursor-move p-1 hover:bg-gray-200 rounded"
        aria-label={`Reorder ${children}`}
        data-oid="cs2zcqn"
      >
        <GripVertical size={16} data-oid="6gbesjb" />
      </button>
      <span className="flex-grow" data-oid="nx77gth">
        {children}
      </span>
      <button onClick={() => alert("clicked delete")} data-oid="-883y13">
        <Delete size={16} data-oid="9cscmf-" />
      </button>
    </li>
  );
}

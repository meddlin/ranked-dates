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
      data-oid="dsbl68z"
    >
      <span className="font-semibold w-6 text-center" data-oid="10f:q1n">
        {index}
      </span>
      <button
        {...listeners}
        className="cursor-move p-1 hover:bg-gray-200 rounded"
        aria-label={`Reorder ${children}`}
        data-oid="0g6lzkq"
      >
        <GripVertical size={16} data-oid="8:7wgzh" />
      </button>
      <span className="flex-grow" data-oid="_d4rrcw">
        {children}
      </span>
      <button onClick={() => alert("clicked delete")} data-oid="9ivgu4.">
        <Delete size={16} data-oid=":gs4zp5" />
      </button>
    </li>
  );
}

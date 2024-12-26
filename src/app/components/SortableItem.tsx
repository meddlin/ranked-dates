import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Delete } from 'lucide-react'

interface SortableItemProps {
  id: string
  index: number
  children: React.ReactNode
}

export function SortableItem({ id, index, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-x-2 p-2 bg-gray-100 rounded"
    >
      <span className="font-semibold w-6 text-center">{index}</span>
      <button
        {...listeners}
        className="cursor-move p-1 hover:bg-gray-200 rounded"
        aria-label={`Reorder ${children}`}
      >
        <GripVertical size={16} />
      </button>
      <span className="flex-grow">{children}</span>
      <button onClick={() => alert('clicked delete')}>
        <Delete size={16} />
      </button>
    </li>
  )
}


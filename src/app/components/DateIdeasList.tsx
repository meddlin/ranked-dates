"use client"

import React, { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DateIdea {
  id: string
  content: string
}

export default function DateIdeasList() {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([
    { id: '1', content: 'Picnic in the park' },
    { id: '2', content: 'Visit a museum' },
    { id: '3', content: 'Cook dinner together' },
    { id: '4', content: 'Go stargazing' },
    { id: '5', content: 'Take a dance class' },
  ])
  const [newIdea, setNewIdea] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setDateIdeas((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  function handleAddIdea(e: React.FormEvent) {
    e.preventDefault()
    if (newIdea.trim()) {
      setDateIdeas([...dateIdeas, { id: `${dateIdeas.length + 1}`, content: newIdea.trim() }])
      setNewIdea('')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Date Ideas List</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={dateIdeas} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2 mb-4">
            {dateIdeas.map((idea, index) => (
              <SortableItem key={idea.id} id={idea.id} index={index + 1}>
                {idea.content}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <form onSubmit={handleAddIdea} className="flex space-x-2">
        <Input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Add a new date idea"
          className="flex-grow"
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  )
}


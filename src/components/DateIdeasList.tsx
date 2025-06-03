"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateIdea } from "@/types/DateIdea";

export default function DateIdeasList(props: {
  title: string;
  placeholderText: string;
  list: DateIdea[];
}) {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>(props.list);
  const [newIdea, setNewIdea] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setDateIdeas((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  async function handleAddIdea(e: React.FormEvent) {
    e.preventDefault();
    if (newIdea.trim()) {
      setDateIdeas([
        ...dateIdeas,
        {
          id: `${dateIdeas.length + 1}`,
          name: newIdea.trim(),
          city: "",
          state: "",
          location: "",
          google_maps_link: "",
          list: "",
          notes: "",
        },
      ]);
      setNewIdea("");
    }

    const response = await fetch(`http://localhost:3000/api/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        idea: newIdea,
      }).toString(),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
      data-oid="_3.amlq"
    >
      <h1 className="text-2xl font-bold mb-4" data-oid="ll.c.88">
        {props.title}
      </h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        data-oid="k53445s"
      >
        <SortableContext
          items={dateIdeas}
          strategy={verticalListSortingStrategy}
          data-oid="90:-::f"
        >
          <ul className="space-y-2 mb-4" data-oid="qlxfmsz">
            {dateIdeas.map((idea, index) => (
              <SortableItem
                key={idea.id}
                id={idea.id}
                index={index + 1}
                notes=""
                data-oid="k.l1y3s"
              >
                {idea.name}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <form
        onSubmit={handleAddIdea}
        className="flex space-x-2"
        data-oid="4_bx0dm"
      >
        <Input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder={props.placeholderText}
          className="flex-grow"
          data-oid="7go8jn3"
        />

        <Button type="submit" data-oid="mgmd7uw">
          Add
        </Button>
      </form>
    </div>
  );
}

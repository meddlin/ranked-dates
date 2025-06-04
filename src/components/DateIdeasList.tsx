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
      data-oid="zx2rewu"
    >
      <h1 className="text-2xl font-bold mb-4" data-oid="dfh0-j-">
        {props.title}
      </h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        data-oid="67zc:e2"
      >
        <SortableContext
          items={dateIdeas}
          strategy={verticalListSortingStrategy}
          data-oid="ufseacx"
        >
          <ul className="space-y-2 mb-4" data-oid="c14t8:p">
            {dateIdeas.map((idea, index) => (
              <SortableItem
                key={idea.id}
                id={idea.id}
                index={index + 1}
                notes=""
                data-oid="rknu59s"
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
        data-oid="t_benr-"
      >
        <Input
          type="text"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder={props.placeholderText}
          className="flex-grow"
          data-oid="-e5hekt"
        />

        <Button type="submit" data-oid="nw.j8__">
          Add
        </Button>
      </form>
    </div>
  );
}

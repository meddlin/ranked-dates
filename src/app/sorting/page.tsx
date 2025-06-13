"use client";

import { useState, useEffect } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Plus,
  GripVertical,
  MapPin,
  Coffee,
  Utensils,
  Mountain,
  Heart,
  Trash2,
  Save,
  Map,
} from "lucide-react";

interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: "restaurant" | "coffee" | "outdoor" | "activity" | "other";
  location?: string;
  rank: number;
}

const categoryIcons = {
  restaurant: Utensils,
  coffee: Coffee,
  outdoor: Mountain,
  activity: Heart,
  other: MapPin,
};

const categoryColors = {
  restaurant: "bg-red-100 text-red-800",
  coffee: "bg-amber-100 text-amber-800",
  outdoor: "bg-green-100 text-green-800",
  activity: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

export default function SortingPage() {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    category: "other" as DateIdea["category"],
    location: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const { isLoaded, isSignedIn, user } = useUser();

  const addDateIdea = () => {
    if (!newIdea.title.trim()) return;

    const idea: DateIdea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.category,
      location: newIdea.location,
      rank: dateIdeas.length + 1,
    };

    setDateIdeas([...dateIdeas, idea]);
    setNewIdea({ title: "", description: "", category: "other", location: "" });
    setShowAddForm(false);
  };

  const removeIdea = (id: string) => {
    const updatedIdeas = dateIdeas
      .filter((idea) => idea.id !== id)
      .map((idea, index) => ({ ...idea, rank: index + 1 }));
    setDateIdeas(updatedIdeas);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = dateIdeas.findIndex((idea) => idea.id === draggedItem);
    const targetIndex = dateIdeas.findIndex((idea) => idea.id === targetId);

    const newIdeas = [...dateIdeas];
    const [draggedIdea] = newIdeas.splice(draggedIndex, 1);
    newIdeas.splice(targetIndex, 0, draggedIdea);

    // Update ranks
    const updatedIdeas = newIdeas.map((idea, index) => ({
      ...idea,
      rank: index + 1,
    }));

    setDateIdeas(updatedIdeas);
    setDraggedItem(null);
  };

  const moveUp = (id: string) => {
    const index = dateIdeas.findIndex((idea) => idea.id === id);
    if (index > 0) {
      const newIdeas = [...dateIdeas];
      [newIdeas[index], newIdeas[index - 1]] = [
        newIdeas[index - 1],
        newIdeas[index],
      ];

      const updatedIdeas = newIdeas.map((idea, idx) => ({
        ...idea,
        rank: idx + 1,
      }));
      setDateIdeas(updatedIdeas);
    }
  };

  const moveDown = (id: string) => {
    const index = dateIdeas.findIndex((idea) => idea.id === id);
    if (index < dateIdeas.length - 1) {
      const newIdeas = [...dateIdeas];
      [newIdeas[index], newIdeas[index + 1]] = [
        newIdeas[index + 1],
        newIdeas[index],
      ];

      const updatedIdeas = newIdeas.map((idea, idx) => ({
        ...idea,
        rank: idx + 1,
      }));
      setDateIdeas(updatedIdeas);
    }
  };

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Rank Your Date Ideas
          </h1>
          <p className="text-muted-foreground">
            Create and prioritize your perfect date ideas. Drag to reorder by
            preference.
          </p>

          <div className="flex justify-center">
            <Link href="/locations">
              <Button
                variant="outline"
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <Map className="h-4 w-4 mr-2" />
                Browse Saved Locations
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Need inspiration? Check out your saved places for date ideas
          </p>
        </div>

        {/* Add New Idea Button */}
        {!showAddForm && (
          <div className="flex justify-center">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Date Idea
            </Button>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <Card className="border-orange-200">
            <CardHeader>
              <h3 className="text-lg font-semibold">Add New Date Idea</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Date idea title (e.g., 'Sunset hike at Griffith Observatory')"
                  value={newIdea.title}
                  onChange={(e) =>
                    setNewIdea({ ...newIdea, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Textarea
                  placeholder="Description or notes about this date idea..."
                  value={newIdea.description}
                  onChange={(e) =>
                    setNewIdea({ ...newIdea, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    value={newIdea.category}
                    onChange={(e) =>
                      setNewIdea({
                        ...newIdea,
                        category: e.target.value as DateIdea["category"],
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="coffee">Coffee Shop</option>
                    <option value="outdoor">Outdoor Activity</option>
                    <option value="activity">Activity/Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Input
                    placeholder="Location (optional)"
                    value={newIdea.location}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={addDateIdea}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Add Idea
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date Ideas List */}
        <div className="space-y-3">
          {dateIdeas.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Heart className="h-12 w-12 text-gray-400 mb-4" />

                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No date ideas yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start building your perfect date list! Use your saved
                  locations for inspiration.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Idea
                  </Button>
                  <Link href="/locations">
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                    >
                      <Map className="h-4 w-4 mr-2" />
                      View Saved Locations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            dateIdeas.map((idea) => {
              const IconComponent = categoryIcons[idea.category];
              return (
                <Card
                  key={idea.id}
                  className="transition-all hover:shadow-md cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, idea.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idea.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Rank Number */}
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {idea.rank}
                      </div>

                      {/* Drag Handle */}
                      <div className="flex-shrink-0 mt-1">
                        <GripVertical className="h-5 w-5 text-gray-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <IconComponent className="h-4 w-4 text-gray-600" />

                              <h3 className="font-semibold text-lg">
                                {idea.title}
                              </h3>
                              <Badge className={categoryColors[idea.category]}>
                                {idea.category}
                              </Badge>
                            </div>
                            {idea.location && (
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin className="h-3 w-3" />

                                {idea.location}
                              </div>
                            )}
                            {idea.description && (
                              <p className="text-gray-700 text-sm">
                                {idea.description}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveUp(idea.id)}
                              disabled={idea.rank === 1}
                              className="h-8 w-8 p-0"
                            >
                              ↑
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveDown(idea.id)}
                              disabled={idea.rank === dateIdeas.length}
                              className="h-8 w-8 p-0"
                            >
                              ↓
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIdea(idea.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Save Button */}
        {dateIdeas.length > 0 && (
          <div className="flex justify-center pt-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Rankings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

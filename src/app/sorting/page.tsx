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
    return <RedirectToSignIn data-oid="ytkiqrw" />;
  }

  return (
    <div
      className="container mx-auto py-6 px-4 sm:py-10 max-w-4xl"
      data-oid="buvwag-"
    >
      <div className="space-y-6" data-oid="-9v:5i0">
        <div className="text-center space-y-4" data-oid="w1sb44_">
          <h1 className="text-3xl font-bold tracking-tight" data-oid="tzwdwa9">
            Rank Your Date Ideas
          </h1>
          <p className="text-muted-foreground" data-oid="z82qx1k">
            Create and prioritize your perfect date ideas. Drag to reorder by
            preference.
          </p>

          <div className="flex justify-center" data-oid="v5ftly8">
            <Link href="/locations" data-oid="m:b0hk:">
              <Button
                variant="outline"
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
                data-oid="hme02-m"
              >
                <Map className="h-4 w-4 mr-2" data-oid="r675l.k" />
                Browse Saved Locations
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500" data-oid="c7v.p17">
            Need inspiration? Check out your saved places for date ideas
          </p>
        </div>

        {/* Add New Idea Button */}
        {!showAddForm && (
          <div className="flex justify-center" data-oid="8r243z:">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
              data-oid="agbcq7j"
            >
              <Plus className="h-4 w-4 mr-2" data-oid="-u57icr" />
              Add Date Idea
            </Button>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <Card className="border-orange-200" data-oid="wwilwkb">
            <CardHeader data-oid="vbm._il">
              <h3 className="text-lg font-semibold" data-oid="naihe_t">
                Add New Date Idea
              </h3>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="hhsvygm">
              <div data-oid="_yx8wja">
                <Input
                  placeholder="Date idea title (e.g., 'Sunset hike at Griffith Observatory')"
                  value={newIdea.title}
                  onChange={(e) =>
                    setNewIdea({ ...newIdea, title: e.target.value })
                  }
                  data-oid="6t_3h_9"
                />
              </div>
              <div data-oid="eqbd10e">
                <Textarea
                  placeholder="Description or notes about this date idea..."
                  value={newIdea.description}
                  onChange={(e) =>
                    setNewIdea({ ...newIdea, description: e.target.value })
                  }
                  rows={3}
                  data-oid=":.7k19u"
                />
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-oid="c19d9wz"
              >
                <div data-oid="exo:xtw">
                  <select
                    value={newIdea.category}
                    onChange={(e) =>
                      setNewIdea({
                        ...newIdea,
                        category: e.target.value as DateIdea["category"],
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    data-oid=".fgi-ww"
                  >
                    <option value="restaurant" data-oid="z-:gf5v">
                      Restaurant
                    </option>
                    <option value="coffee" data-oid="7_n78n.">
                      Coffee Shop
                    </option>
                    <option value="outdoor" data-oid="-lhvrlt">
                      Outdoor Activity
                    </option>
                    <option value="activity" data-oid="2-.mmip">
                      Activity/Entertainment
                    </option>
                    <option value="other" data-oid="263sser">
                      Other
                    </option>
                  </select>
                </div>
                <div data-oid="70gnpa3">
                  <Input
                    placeholder="Location (optional)"
                    value={newIdea.location}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, location: e.target.value })
                    }
                    data-oid="3yg2x8g"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end" data-oid="5_lhxg:">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  data-oid="3qqzp94"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addDateIdea}
                  className="bg-orange-500 hover:bg-orange-600"
                  data-oid="om:jjnl"
                >
                  Add Idea
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date Ideas List */}
        <div className="space-y-3" data-oid="kl6152.">
          {dateIdeas.length === 0 ? (
            <Card
              className="border-dashed border-2 border-gray-300"
              data-oid="ydshbb4"
            >
              <CardContent
                className="flex flex-col items-center justify-center py-12 text-center"
                data-oid="w2xw01t"
              >
                <Heart
                  className="h-12 w-12 text-gray-400 mb-4"
                  data-oid="h9jlxre"
                />

                <h3
                  className="text-lg font-semibold text-gray-600 mb-2"
                  data-oid="kh0r6k_"
                >
                  No date ideas yet
                </h3>
                <p className="text-gray-500 mb-4" data-oid="6yjd.5_">
                  Start building your perfect date list! Use your saved
                  locations for inspiration.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  data-oid="9gujbwu"
                >
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-orange-500 hover:bg-orange-600"
                    data-oid="byp2zyq"
                  >
                    <Plus className="h-4 w-4 mr-2" data-oid="1854wu6" />
                    Add Your First Idea
                  </Button>
                  <Link href="/locations" data-oid="tydrg0l">
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      data-oid="_jp.w0c"
                    >
                      <Map className="h-4 w-4 mr-2" data-oid="gn943v-" />
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
                  data-oid="sdinfis"
                >
                  <CardContent className="p-4" data-oid="pt4kpnj">
                    <div className="flex items-start gap-4" data-oid="pk:ubgh">
                      {/* Rank Number */}
                      <div
                        className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
                        data-oid="atx.lz-"
                      >
                        {idea.rank}
                      </div>

                      {/* Drag Handle */}
                      <div className="flex-shrink-0 mt-1" data-oid="8cr1qgv">
                        <GripVertical
                          className="h-5 w-5 text-gray-400"
                          data-oid="a8cs2lk"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0" data-oid="d5qme2n">
                        <div
                          className="flex items-start justify-between gap-4"
                          data-oid="28nsdoz"
                        >
                          <div className="flex-1" data-oid="lvaf5ww">
                            <div
                              className="flex items-center gap-2 mb-2"
                              data-oid="yrf6t0y"
                            >
                              <IconComponent
                                className="h-4 w-4 text-gray-600"
                                data-oid="fmiudy_"
                              />

                              <h3
                                className="font-semibold text-lg"
                                data-oid="a829ml6"
                              >
                                {idea.title}
                              </h3>
                              <Badge
                                className={categoryColors[idea.category]}
                                data-oid="x54-nn0"
                              >
                                {idea.category}
                              </Badge>
                            </div>
                            {idea.location && (
                              <div
                                className="flex items-center gap-1 text-sm text-gray-600 mb-2"
                                data-oid=".l4k60k"
                              >
                                <MapPin
                                  className="h-3 w-3"
                                  data-oid="8bx0kdf"
                                />

                                {idea.location}
                              </div>
                            )}
                            {idea.description && (
                              <p
                                className="text-gray-700 text-sm"
                                data-oid="peswhq4"
                              >
                                {idea.description}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div
                            className="flex flex-col gap-1"
                            data-oid="c01o:ym"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveUp(idea.id)}
                              disabled={idea.rank === 1}
                              className="h-8 w-8 p-0"
                              data-oid=".t7jx59"
                            >
                              ↑
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveDown(idea.id)}
                              disabled={idea.rank === dateIdeas.length}
                              className="h-8 w-8 p-0"
                              data-oid="9qa:mnk"
                            >
                              ↓
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIdea(idea.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              data-oid="8fl70ks"
                            >
                              <Trash2 className="h-4 w-4" data-oid="0gph77z" />
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
          <div className="flex justify-center pt-6" data-oid="rvrv2tj">
            <Button
              className="bg-green-600 hover:bg-green-700"
              data-oid="3:q0qya"
            >
              <Save className="h-4 w-4 mr-2" data-oid="bmzlwju" />
              Save Rankings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

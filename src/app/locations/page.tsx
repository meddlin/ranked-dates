"use client";

import { useState, useEffect } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Place } from "@/types/DateIdea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationsHeader } from "@/components/locations/LocationsHeader";
import { LocationsControls } from "@/components/locations/LocationsControls";
import { EmptyLocations } from "@/components/locations/EmptyLocations";
import { LocationCard } from "@/components/locations/LocationCard";
import { LocationEditForm } from "@/components/locations/LocationEditForm";

export default function LocationsPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State to track the current view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [data, _setData] = useState<Place[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Place>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique list names for filtering
  const listNames = [...new Set(data.map((item) => item.list))];

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.city.toLowerCase().includes(searchLower) ||
      item.state.toLowerCase().includes(searchLower) ||
      item.notes?.toLowerCase().includes(searchLower)
    );
  });

  // Quick action handlers
  const handleEdit = (item: Place) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      city: item.city,
      state: item.state,
      notes: item.notes,
      list: item.list,
      google_maps_link: item.google_maps_link,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = (itemId: string) => {
    // TODO: Send update to API
    console.log("Saving edit:", editForm);

    // Reset editing state
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (item: Place) => {
    // TODO: Show confirmation dialog and delete
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      console.log("Delete location:", item);
      // Remove from state for now
      _setData(data.filter((location) => location.id !== item.id));
    }
  };

  const handleToggleFavorite = (item: Place) => {
    // TODO: Toggle favorite status
    console.log("Toggle favorite:", item);
  };

  const handleCopyLocation = (item: Place) => {
    const locationText = `${item.name} - ${item.city}, ${item.state}`;
    navigator.clipboard.writeText(locationText);
    // TODO: Show toast notification
    console.log("Copied to clipboard:", locationText);
  };

  useEffect(() => {
    if (!user) return;

    fetch(`/api/places/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        _setData(data as Place[]);
      });
  }, [user]);

  return (
    <>
      {isSignedIn ? (
        <div className="container mx-auto py-6 px-4 sm:py-10">
          <div className="flex flex-col space-y-6">
            <LocationsHeader data={data} listNames={listNames} />

            <LocationsControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSearch={setSearchQuery}
            />

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {data.length === 0 ? (
              <EmptyLocations />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredData.map((item) =>
                  editingId === item.id ? (
                    <LocationEditForm
                      key={item.id}
                      item={item}
                      editForm={editForm}
                      onEditFormChange={setEditForm}
                      onSave={() => handleSaveEdit(item.id)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <LocationCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                      onCopyLocation={handleCopyLocation}
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredData.map((item) =>
                  editingId === item.id ? (
                    <LocationEditForm
                      key={item.id}
                      item={item}
                      editForm={editForm}
                      onEditFormChange={setEditForm}
                      onSave={() => handleSaveEdit(item.id)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <LocationCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                      onCopyLocation={handleCopyLocation}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <RedirectToSignIn />
      )}
    </>
  );
}

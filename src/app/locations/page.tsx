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
import { LocationCreateForm } from "@/components/locations/LocationCreateForm";

export default function LocationsPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // State to track the current view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [data, _setData] = useState<Place[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Place>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<Place>>({});

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

  const handleAddLocation = () => {
    setIsCreating(true);
    setCreateForm({});
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setCreateForm({});
  };

  const handleSaveCreate = async () => {
    if (!user || !createForm.name || !createForm.city || !createForm.state) {
      return;
    }

    try {
      // Generate a temporary ID for the new location
      const newLocation = new Place();
      newLocation.id = Date.now().toString();
      newLocation.name = createForm.name;
      newLocation.location = createForm.location || "";
      newLocation.city = createForm.city;
      newLocation.state = createForm.state;
      newLocation.google_maps_link = createForm.google_maps_link || "";
      newLocation.list = createForm.list || "Default";
      newLocation.notes = createForm.notes || "";

      // TODO: Send create request to API
      console.log("Creating new location:", newLocation);

      // For now, add to local state
      _setData([...data, newLocation]);

      // Reset creation state
      setIsCreating(false);
      setCreateForm({});
    } catch (error) {
      console.error("Error creating location:", error);
      // TODO: Show error toast
    }
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
        <div
          className="container mx-auto py-6 px-4 sm:py-10"
          data-oid="766_srp"
        >
          <div className="flex flex-col space-y-6" data-oid="sfqt5qs">
            <LocationsHeader
              data={data}
              listNames={listNames}
              data-oid="_lytnjv"
            />

            <LocationsControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSearch={setSearchQuery}
              onAddLocation={handleAddLocation}
              data-oid="zsg:7:r"
            />

            <Tabs defaultValue="all" data-oid="-79pdks">
              <TabsList data-oid=".qrl5wm">
                <TabsTrigger value="all" data-oid="ojo1z8s">
                  All
                </TabsTrigger>
                {listNames.map((list) => (
                  <TabsTrigger
                    key={list}
                    value={list.toLowerCase().replace(/\s+/g, "-")}
                    data-oid=":7s-42x"
                  >
                    {list}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {isCreating && (
              <LocationCreateForm
                createForm={createForm}
                onCreateFormChange={setCreateForm}
                onSave={handleSaveCreate}
                onCancel={handleCancelCreate}
                existingLists={listNames}
                data-oid="create-location-form"
              />
            )}

            {data.length === 0 && !isCreating ? (
              <EmptyLocations
                onAddLocation={handleAddLocation}
                data-oid="mlc.00a"
              />
            ) : viewMode === "grid" ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                data-oid="kd:_vqd"
              >
                {isCreating && (
                  <LocationCreateForm
                    createForm={createForm}
                    onCreateFormChange={setCreateForm}
                    onSave={handleSaveCreate}
                    onCancel={handleCancelCreate}
                    existingLists={listNames}
                    data-oid="create-location-form-grid"
                  />
                )}
                {filteredData.map((item) =>
                  editingId === item.id ? (
                    <LocationEditForm
                      key={item.id}
                      item={item}
                      editForm={editForm}
                      onEditFormChange={setEditForm}
                      onSave={() => handleSaveEdit(item.id)}
                      onCancel={handleCancelEdit}
                      data-oid="ta0n_o0"
                    />
                  ) : (
                    <LocationCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                      onCopyLocation={handleCopyLocation}
                      data-oid="op_79qa"
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-4" data-oid="d0b3m-_">
                {isCreating && (
                  <LocationCreateForm
                    createForm={createForm}
                    onCreateFormChange={setCreateForm}
                    onSave={handleSaveCreate}
                    onCancel={handleCancelCreate}
                    existingLists={listNames}
                    data-oid="create-location-form-list"
                  />
                )}
                {filteredData.map((item) =>
                  editingId === item.id ? (
                    <LocationEditForm
                      key={item.id}
                      item={item}
                      editForm={editForm}
                      onEditFormChange={setEditForm}
                      onSave={() => handleSaveEdit(item.id)}
                      onCancel={handleCancelEdit}
                      data-oid="qa8jv6w"
                    />
                  ) : (
                    <LocationCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                      onCopyLocation={handleCopyLocation}
                      data-oid="o5itoo."
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <RedirectToSignIn data-oid="p0y-bb0" />
      )}
    </>
  );
}

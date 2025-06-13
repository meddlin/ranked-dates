"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useReducer, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DateIdeasList from "@/components/DateIdeasList";
import { DateIdea, Place } from "@/types/DateIdea";
import { useAppStore } from "@/lib/clientStore";
import NotesDisplay from "@/components/NotesDisplay";
import { useUser } from "@clerk/clerk-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function Import() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, _setData] = useState<Place[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const rerender = useReducer(() => ({}), {})[1];

  useEffect(() => {
    fetch("http://localhost:3000/api/places")
      .then((res) => res.json())
      .then((data) => {
        _setData(data as Place[]);
      });
  }, []);

  const parseCSV = (csvText: string): Place[] => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const places: Place[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      const place: Partial<Place> = {};

      headers.forEach((header, index) => {
        const value = values[index] || "";

        // Map common Google Maps export headers to our Place interface
        switch (header.toLowerCase()) {
          case "name":
          case "title":
            place.name = value;
            break;
          case "address":
          case "location":
            place.location = value;
            break;
          case "url":
          case "google maps url":
          case "maps link":
            place.google_maps_link = value;
            break;
          case "comment":
          case "note":
          case "notes":
            place.notes = value;
            break;
          case "list":
          case "list name":
            place.list = value;
            break;
        }
      });

      if (place.name) {
        places.push(place as Place);
      }
    }

    return places;
  };

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setUploadStatus("Please upload a CSV file");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Processing CSV file...");

    try {
      const text = await file.text();
      const parsedPlaces = parseCSV(text);

      if (parsedPlaces.length === 0) {
        setUploadStatus("No valid location data found in CSV");
        setIsUploading(false);
        return;
      }

      // Send to API to save
      const response = await fetch("/api/places/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ places: parsedPlaces }),
      });

      if (response.ok) {
        setUploadStatus(
          `Successfully imported ${parsedPlaces.length} locations`,
        );
        // Refresh the data
        const updatedData = await fetch(
          "http://localhost:3000/api/places",
        ).then((res) => res.json());
        _setData(updatedData as Place[]);
      } else {
        setUploadStatus("Failed to save imported data");
      }
    } catch (error) {
      setUploadStatus("Error processing file: " + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload],
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const columnHelper = createColumnHelper<Place>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("location", {
      header: () => "Location",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("google_maps_link", {
      header: (info) => <span>Maps</span>,
      cell: (info) => {
        const url = info.getValue();
        return url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View on Maps
          </a>
        ) : null;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("list", {
      header: "List",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("notes", {
      header: "Notes",
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Import</h1>
        <p className="text-gray-600">
          Import your Google Maps saved places or view existing locations
        </p>
      </div>

      {/* CSV Upload Section */}
      <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Import Google Maps Data
          </h2>
          <p className="text-gray-600 mb-4">
            Upload your CSV file from Google Takeout to import your saved places
          </p>

          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {isUploading ? (
                <div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-blue-600">Processing...</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your CSV file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports CSV files from Google Takeout
                  </p>
                </div>
              )}
            </div>
          </div>

          {uploadStatus && (
            <div
              className={`mt-4 p-3 rounded-md ${
                uploadStatus.includes("Successfully")
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : uploadStatus.includes("Error") ||
                      uploadStatus.includes("Failed")
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>
      </div>

      {/* Data Table Section */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              Your Saved Places ({data.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.length === 0 && !isUploading && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No locations yet
          </h3>
          <p className="text-gray-500">
            Upload a CSV file to get started with your saved places
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => rerender()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Refresh Data
        </button>

        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

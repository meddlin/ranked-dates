"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useReducer } from "react";
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

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, _setData] = useState<Place[]>([]);
  const rerender = useReducer(() => ({}), {})[1];
  useEffect(() => {
    fetch("http://localhost:3000/api/places")
      .then((res) => res.json())
      .then((data) => {
        _setData(data as Place[]);
      });
  }, []);

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
      header: (info) => <span data-oid="_rkbl.v">Maps</span>,
      cell: (info) => (
        <a href={info.getValue()} data-oid="by9-1be">
          {info.getValue()}
        </a>
      ),

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
    <div className="p-2" data-oid="r87rhul">
      <table data-oid="3x_1jlw">
        <thead data-oid="gxwcvsa">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} data-oid="38dvzwd">
              {headerGroup.headers.map((header) => (
                <th key={header.id} data-oid="5lq0qku">
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
        <tbody data-oid="kcci5a5">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-oid="6o-lvuj">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-oid="hp379wx">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot data-oid="mhd29n4">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} data-oid="82t.wpu">
              {footerGroup.headers.map((header) => (
                <th key={header.id} data-oid="7k92lsd">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" data-oid=".tmr0bh" />
      <button
        onClick={() => rerender()}
        className="border p-2"
        data-oid="0fh4oby"
      >
        Rerender
      </button>
    </div>
  );
}

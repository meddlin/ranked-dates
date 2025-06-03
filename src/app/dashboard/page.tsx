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

// type Person = {
//     firstName: string
//     lastName: string
//     age: number
//     visits: number
//     status: string
//     progress: number
// }

const defaultData: DateIdea[] = [
  {
    id: "1",
    name: "test place",
    location: "Austin, TX",
    city: "Austin",
    state: "TX",
    google_maps_link: "https://maps.google.com",
    list: "test",
    notes: "more later",
  },
];

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
      header: (info) => <span data-oid="4rqkpd7">Maps</span>,
      cell: (info) => (
        <a href={info.getValue()} data-oid="coylm22">
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
    <div className="p-2" data-oid="pbo-793">
      <table data-oid="dsvzzto">
        <thead data-oid="a6dz3av">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} data-oid="vdbt_ss">
              {headerGroup.headers.map((header) => (
                <th key={header.id} data-oid="4.ox8q4">
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
        <tbody data-oid="3-9o.kd">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-oid=":jmbd3u">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-oid="7d5r89_">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot data-oid="u5fkdhb">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} data-oid="hcpo85d">
              {footerGroup.headers.map((header) => (
                <th key={header.id} data-oid="ee6xikn">
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
      <div className="h-4" data-oid="mn28m8:" />
      <button
        onClick={() => rerender()}
        className="border p-2"
        data-oid="puqfh1u"
      >
        Rerender
      </button>
    </div>
  );
}

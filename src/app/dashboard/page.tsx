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
      header: (info) => <span data-oid="-wr.8d-">Maps</span>,
      cell: (info) => (
        <a href={info.getValue()} data-oid="3qn0.ac">
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
    <div className="p-2" data-oid="nrvke-:">
      <table data-oid="10t:8d0">
        <thead data-oid="x0ta2v3">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} data-oid="e0vvvxh">
              {headerGroup.headers.map((header) => (
                <th key={header.id} data-oid="r:wo_2b">
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
        <tbody data-oid="udloht7">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-oid="jkn72_r">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-oid=".y9ff50">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot data-oid="yvxwxln">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} data-oid="t35354k">
              {footerGroup.headers.map((header) => (
                <th key={header.id} data-oid=".dkc403">
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
      <div className="h-4" data-oid="wz.xncc" />
      <button
        onClick={() => rerender()}
        className="border p-2"
        data-oid="j.5.sjk"
      >
        Rerender
      </button>
    </div>
  );
}

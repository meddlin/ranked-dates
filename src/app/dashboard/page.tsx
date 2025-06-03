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
      header: (info) => <span data-oid="cdjz6bd">Maps</span>,
      cell: (info) => (
        <a href={info.getValue()} data-oid="11397bv">
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
    <div className="p-2" data-oid="bipyb__">
      <table data-oid="sec4v3t">
        <thead data-oid="fq8u48f">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} data-oid="ol5diy_">
              {headerGroup.headers.map((header) => (
                <th key={header.id} data-oid="3_8zzmb">
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
        <tbody data-oid="5l_ys5:">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} data-oid="e.c0:2p">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-oid="9qckz39">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot data-oid="1q:0qwn">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} data-oid="7qh5y64">
              {footerGroup.headers.map((header) => (
                <th key={header.id} data-oid="9u:h8y6">
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
      <div className="h-4" data-oid="2wle_tl" />
      <button
        onClick={() => rerender()}
        className="border p-2"
        data-oid="g1an86v"
      >
        Rerender
      </button>
    </div>
  );
}

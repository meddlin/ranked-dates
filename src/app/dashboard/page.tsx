'use client'

import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect, useReducer } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DateIdeasList from "@/components/DateIdeasList";
import { DateIdea, Place } from "@/types/DateIdea";
import { useAppStore } from '@/lib/clientStore';
import NotesDisplay from "@/components/NotesDisplay";
import { useUser } from '@clerk/clerk-react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

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
        id: '1',
        name: 'test place',
        location: 'Austin, TX',
        google_maps_link: 'https://maps.google.com',
        list: 'test',
        notes: 'more later'
    },
]

export default function Dashboard() {
    // const [places, setPlaces] = useState<Place[]>([]);
    const { isLoaded, isSignedIn, user } = useUser();
    const [data, _setData] = useState<Place[]>([]); // useState(() => [...defaultData])
    const rerender = useReducer(() => ({}), {})[1]
    useEffect(() => {
        fetch('http://localhost:3000/api/places')
            .then((res) => res.json())
            .then((data) => {
                _setData(data as Place[])
            })
    }, [])

    const columnHelper = createColumnHelper<Place>()

    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('location', {
            header: () => 'Location',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('google_maps_link', {
            header: (info) => <span>Maps</span>,
            cell: (info) => <a href={info.getValue()}>{info.getValue()}</a>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('list', {
            header: 'List',
            footer: info => info.column.id,
        }),
        columnHelper.accessor('notes', {
            header: 'Notes',
            footer: info => info.column.id,
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    )
}
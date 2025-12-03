import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2 } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

export default function DataTable({ data = [], countries = [], onEdit }) {
  const columns = useMemo(() => [
    {
      accessorKey: "entity",
      header: "Entity",
      cell: info => <div className="text-gray-900 font-medium">{info.getValue() ?? "N/A"}</div>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: info => {
        const gender = info.getValue()?.toLowerCase() ?? "N/A";
        const isMale = String(gender).toLowerCase() === "male";
        return (
          <span className={isMale ? "badge-male" : "badge-female"}>
            {gender}
          </span>
        );
      },
    },
    {
      accessorKey: "requestDate",
      header: "Request date",
      cell: info => {
        const raw = info.getValue();
        const d = new Date(raw);
        const text = isNaN(d)
          ? (raw || "N/A")
          : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return <div className="text-gray-700">{text}</div>;
      }
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <div className="flex items-center gap-2">
          <span>Country</span>
          {countries?.length > 0 && <FilterDropdown column={column} countries={countries} />}
        </div>
      ),
      cell: info => <div className="text-gray-700">{info.getValue() || "N/A"}</div>,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true;
        return filterValue.includes(row.getValue(columnId));
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <button
          onClick={() => onEdit(row.original)}
          className="text-gray-400 hover:text-[var(--primary)] transition-colors p-1"
        >
          <Edit2 size={18} />
        </button>
      )
    }
  ], [countries, onEdit]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="card mx-auto">
      <div className="card-header">
        <div />
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">Tax Records</div>
          <div className="text-sm text-gray-500">Manage and view tax information</div>
        </div>
        <div />
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id} className="border-b border-gray-200 bg-gray-50/70">
                {hg.headers.map(header => (
                  <th key={header.id} className="th">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="tr-hover">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="td">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
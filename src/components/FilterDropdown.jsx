import React, { useState } from "react";
import { Filter } from "lucide-react";

export default function FilterDropdown({ column, countries = [] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  function toggle(name) {
    const next = selected.includes(name) ? selected.filter(s => s !== name) : [...selected, name];
    setSelected(next);
    column.setFilterValue(next.length ? next : undefined);
  }

  return (
    <div className="relative inline-block" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(v => !v)} className="icon-btn" aria-label="filter">
        <Filter size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-50">
          <div className="filter-box">
            <div className="max-h-48 overflow-y-auto">
              {countries.length ? countries.map(c => (
                <label key={c.id} className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(c.name)}
                    onChange={() => toggle(c.name)}
                    className="mr-2 accent-[var(--primary)]"
                  />
                  <span className="text-sm text-gray-700">{c.name}</span>
                </label>
              )) : <div className="px-3 py-2 text-sm text-gray-500">No countries</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

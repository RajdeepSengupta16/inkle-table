import { useState, useRef, useEffect } from "react";

export default function FilterDropdown({ column, countries }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle() {
    setOpen(prev => !prev);
  }

  function applyToggle(name) {
    const current = column.getFilterValue() || [];
    const next = current.includes(name)
      ? current.filter(v => v !== name)
      : [...current, name];
    column.setFilterValue(next.length ? next : undefined);
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {/* Filter button */}
      <button
        className="icon-btn"
        onClick={toggle}
        aria-label="Filter"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 3H2l7 9v7l6 3v-10l7-9z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 z-50 filter-box max-h-60 overflow-y-auto">
          {countries.map(c => {
            const active = (column.getFilterValue() || []).includes(c.name);
            return (
              <label
                key={c.id}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => applyToggle(c.name)}
                  className="accent-[var(--primary)]"
                />
                <span className="text-sm text-gray-700">{c.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
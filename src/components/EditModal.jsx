import React, { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function EditModal({ isOpen, onClose, data, countries = [], onSave }) {
  const [form, setForm] = useState({ entity: "", country: "", countryId: "" });
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        entity: data.entity || "",
        country: data.country || "",
        countryId: data.countryId || ""
      });
    }
  }, [data]);

  useEffect(() => {
    // Close dropdown when modal closes
    if (!isOpen) {
      setOpenList(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(e) {
      if (openList && !e.target.closest('.country-dropdown-container')) {
        setOpenList(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openList]);

  if (!isOpen) return null;

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!data) return;
    const payload = { ...data, ...form };
    await onSave(payload);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card relative -top-8 max-h-[80vh] overflow-y-auto">
        <div className="modal-header">
          <h3 className="text-lg font-semibold">Edit Customer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="input mb-4"
            value={form.entity}
            onChange={(e) => setField("entity", e.target.value)}
            placeholder="Enter name"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <div className="relative country-dropdown-container">
            <button
              onClick={() => setOpenList(v => !v)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-left flex items-center justify-between"
            >
              <span className={form.country ? "text-gray-900" : "text-gray-400"}>
                {form.country || "Select country"}
              </span>
              <ChevronDown size={18} />
            </button>

            {openList && (
              <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 absolute w-full">
                {countries.map(c => (
                  <div
                    key={c.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setField("country", c.name);
                      setField("countryId", c.id);
                      setOpenList(false);
                    }}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary">Save</button>
        </div>
      </div>

      <style>{`
        .modal-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          width: 500px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
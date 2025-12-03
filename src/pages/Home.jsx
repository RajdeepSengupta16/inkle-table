import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import EditModal from "../components/EditModal";
import { fetchTaxes, fetchCountries, updateTax } from "../services/api";

export default function Home() {
  const [taxes, setTaxes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      const [taxData, countryData] = await Promise.all([fetchTaxes(), fetchCountries()]);
      setTaxes(Array.isArray(taxData) ? taxData : []);
      setCountries(Array.isArray(countryData) ? countryData : []);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  function openEdit(row) {
    setEditingRow(row);
    setIsModalOpen(true);
  }

  function closeEdit() {
    setEditingRow(null);
    setIsModalOpen(false);
  }

  async function handleSave(updated) {
    try {
      const saved = await updateTax(updated.id, updated);
      setTaxes(prev => prev.map(r => (String(r.id) === String(saved.id) ? saved : r)));
      closeEdit();
    } catch (e) {
      console.error(e);
      alert("Failed to save. See console.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadAll} className="btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrap">
      <div className="container-card">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Tax Handler</h1>
          <p className="text-gray-500 mt-2">Turning tax chaos into clarity.</p>
        </div>

        <DataTable data={taxes} countries={countries} onEdit={openEdit} />

        <EditModal
          isOpen={isModalOpen}
          onClose={closeEdit}
          data={editingRow}
          countries={countries}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
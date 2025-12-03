// src/services/api.jsx
import axios from "axios";

const COUNTRIES_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/countries";
const TAXES_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/taxes";

// Normalizes each tax item so keys always exist
function normalizeTax(item) {
  return {
    id: item.id ?? "",
    entity: item.entity ?? item.name ?? "N/A",
    name: item.name ?? item.entity ?? "",
    gender: item.gender ?? "N/A",
    country: item.country ?? "N/A",
    countryId: item.countryId ?? "",
    requestDate: item.requestDate ?? item.date ?? "",
    tax: item.tax ?? 0,
    createdAt: item.createdAt ?? "",
  };
}

// ---------------------------
// FETCH COUNTRIES
// ---------------------------
export async function fetchCountries() {
  const res = await axios.get(COUNTRIES_URL);
  return Array.isArray(res.data) ? res.data : [];
}

// ---------------------------
// FETCH TAXES (Normalized)
// ---------------------------
export async function fetchTaxes() {
  const res = await axios.get(TAXES_URL);
  const raw = Array.isArray(res.data) ? res.data : [];
  return raw.map(normalizeTax);
}

// ---------------------------
// UPDATE TAX ENTRY
// ---------------------------
export async function updateTax(id, payload) {
  const res = await axios.put(`${TAXES_URL}/${id}`, payload);
  return normalizeTax(res.data);
}

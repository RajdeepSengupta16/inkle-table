// src/services/api.jsx

import axios from "axios";

// API ENDPOINTS (replace with your own URLs)
const COUNTRIES_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/countries";
const TAXES_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/taxes";

// ---------------------------
// FETCH COUNTRIES
// ---------------------------
export async function fetchCountries() {
  const res = await axios.get(COUNTRIES_URL);
  return res.data;
}

// ---------------------------
// FETCH TAXES
// ---------------------------
export async function fetchTaxes() {
  const res = await axios.get(TAXES_URL);
  return res.data;
}

// ---------------------------
// UPDATE TAX ENTRY
// ---------------------------
export async function updateTax(id, payload) {
  const res = await axios.put(`${TAXES_URL}/${id}`, payload);
  return res.data;
}

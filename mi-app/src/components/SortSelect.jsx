import React from 'react';

export function SortSelect({ value, onChange }) {
  return (
    <select
      className="border rounded px-3 py-2 focus:outline-none focus:ring"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Ordenar por…</option>
      <option value="price_asc">Precio ↑</option>
      <option value="price_desc">Precio ↓</option>
      <option value="rating_asc">Rating ↑</option>
      <option value="rating_desc">Rating ↓</option>
    </select>
  );
}

export default SortSelect;
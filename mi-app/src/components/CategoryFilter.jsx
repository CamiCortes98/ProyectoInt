import React from 'react';

export function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      className="border rounded px-3 py-2 focus:outline-none focus:ring"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}
import React from 'react'

export function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar"
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
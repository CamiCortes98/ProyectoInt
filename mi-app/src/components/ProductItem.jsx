import React from 'react'

export function ProductItem({ product }) {
  return (
    <div className="border rounded p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>
    </div>
  )
}
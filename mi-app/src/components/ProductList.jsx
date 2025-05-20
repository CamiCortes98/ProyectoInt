function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow hover:shadow-xl transition-all p-4 border border-gray-100"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-contain mb-4 rounded"
          />
          <h2 className="font-semibold text-lg mb-1 hover:text-blue-700 transition-transform cursor-pointer">
            {product.title}
          </h2>
          <p className="text-gray-700 mb-1">Precio: ${product.price}</p>
          <p className="text-sm text-gray-500">Descuento: {product.discountPercentage}%</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
function StatsPanel({ products }) {
  if (!products.length) return null;

  const mostExpensive = products.reduce((a, b) => (a.price > b.price ? a : b));
  const cheapest = products.reduce((a, b) => (a.price < b.price ? a : b));
  const longTitleCount = products.filter((p) => p.title.length > 20).length;
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const avgDiscount = (
    products.reduce((sum, p) => sum + p.discountPercentage, 0) / products.length
  ).toFixed(2);

  return (
    <section className="bg-gradient-to-r from-gray-100 to-blue-50 p-6 rounded-xl shadow-md transition-all animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">📊 Resumen de productos disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">🪙 Producto más económico</h3>
          <p>{cheapest.title} (${cheapest.price})</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">💰 Producto más caro</h3>
          <p>{mostExpensive.title} (${mostExpensive.price})</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">📈 Promedio de descuento</h3>
          <p>{avgDiscount}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">🧾 Títulos largos</h3>
          <p>{longTitleCount} productos con más de 20 caracteres</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">💵 Precio total listado</h3>
          <p>${totalPrice.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">🛒 Total de productos visibles</h3>
          <p>{products.length}</p>
        </div>
      </div>
    </section>
  );
}

export default StatsPanel;
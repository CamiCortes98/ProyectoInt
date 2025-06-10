import React from 'react';

export function StatsDetailed({ items }) {
  if (!items.length) {
    return <p className="p-4">No hay datos para estadísticas.</p>;
  }


  const prices = items.map(p => p.price ?? 0);
  const ratings = items.map(p => p.rating ?? 0);


  const avgPrice = prices.reduce((s, v) => s + v, 0) / (prices.length || 1);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);


  const countByCat = items.reduce((o, p) => {
    const cat = p.category ?? 'Sin categoría';
    o[cat] = (o[cat] || 0) + 1;
    return o;
  }, {});


  const lowStock   = items.filter(p => (p.stock ?? 0) <= 50).length;
  const highRating = items.filter(p => (p.rating ?? 0) >= 4.5).length;


  const avgByCat = Object.entries(
    items.reduce((a, p) => {
      const cat = p.category ?? 'Sin categoría';
      if (!a[cat]) a[cat] = { sum: 0, count: 0 };
      a[cat].sum   += p.price ?? 0;
      a[cat].count += 1;
      return a;
    }, {})
  ).map(([cat, { sum, count }]) => ({ cat, avg: sum / count }));


  const extremes = Object.values(
    items.reduce((a, p) => {
      const cat = p.category ?? 'Sin categoría';
      if (!a[cat]) a[cat] = { most: p, least: p };
      if ((p.price ?? 0) > (a[cat].most.price  ?? 0))           a[cat].most  = p;
      if ((p.price ?? Infinity) < (a[cat].least.price ?? Infinity)) a[cat].least = p;
      return a;
    }, {})
  );


  const avgRating = ratings.reduce((s, v) => s + v, 0) / (ratings.length || 1);
  const avgRatingByCat = Object.entries(
    items.reduce((a, p) => {
      const cat = p.category ?? 'Sin categoría';
      if (!a[cat]) a[cat] = { sum: 0, count: 0 };
      a[cat].sum   += p.rating ?? 0;
      a[cat].count += 1;
      return a;
    }, {})
  ).map(([cat, { sum, count }]) => ({ cat, avg: sum / count }));

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Precio Promedio</h4>
        <p>{avgPrice.toFixed(2)}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Precio Máx / Mín</h4>
        <p>Max: {maxPrice} – Min: {minPrice}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Productos por Categoría</h4>
        <ul>
          {Object.entries(countByCat).map(([c, n]) => (
            <li key={c}>{c}: {n}</li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Stock ≤50 / Rating ≥4.5</h4>
        <p>Stock ≤50: {lowStock}</p>
        <p>Rating ≥4.5: {highRating}</p>
      </div>

      <div className="p-4 bg-white rounded shadow md:col-span-2">
        <h4 className="font-semibold">Precio Promedio por Categoría</h4>
        <ul>
          {avgByCat.map(a => (
            <li key={a.cat}>{a.cat}: {a.avg.toFixed(2)}</li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white rounded shadow md:col-span-2">
        <h4 className="font-semibold">Productos Extremos por Categoría</h4>
        {extremes.map(({ most, least }) => (
          <div key={most.id}>
            <strong>{most.category}</strong> – Más caro: {most.title ?? most.name} ({most.price}), Más barato: {least.title ?? least.name} ({least.price})
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Rating Promedio Global</h4>
        <p>{avgRating.toFixed(2)}</p>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-semibold">Rating Promedio por Categoría</h4>
        <ul>
          {avgRatingByCat.map(a => (
            <li key={a.cat}>{a.cat}: {a.avg.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatsDetailed;
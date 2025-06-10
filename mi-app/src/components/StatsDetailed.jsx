import React from 'react';

export function StatsDetailed({ items }) {
  if (!items.length)
    return <p className="p-4">No hay datos para estadísticas.</p>;

  const prices = items.map(p=>p.price);
  const avgPrice = prices.reduce((sum,v)=>sum+v,0)/prices.length;
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const countByCat = items.reduce((o,p)=>{
    o[p.category]=(o[p.category]||0)+1; return o;
  },{});
  const lowStock   = items.filter(p=>p.stock<=50).length;
  const highRating = items.filter(p=>p.rating>=4.5).length;


  const avgByCat = Object.entries(
    items.reduce((a,p)=>{
      if(!a[p.category]) a[p.category]={sum:0,count:0};
      a[p.category].sum+=p.price; a[p.category].count+=1;
      return a;
    },{})
  ).map(([cat,{sum,count}])=>({cat,avg:sum/count}));


  const extremes = Object.values(
    items.reduce((a,p)=>{
      if(!a[p.category]) a[p.category]={most:p,least:p};
      if(p.price>a[p.category].most.price)  a[p.category].most = p;
      if(p.price<a[p.category].least.price) a[p.category].least = p;
      return a;
    },{})
  );


  const avgRating = items.reduce((s,p)=>s+p.rating,0)/items.length;
  const avgRatingByCat = Object.entries(
    items.reduce((a,p)=>{
      if(!a[p.category]) a[p.category]={sum:0,count:0};
      a[p.category].sum+=p.rating; a[p.category].count+=1;
      return a;
    },{})
  ).map(([cat,{sum,count}])=>({cat,avg:sum/count}));

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
          {Object.entries(countByCat).map(([c,n])=>(
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
          {avgByCat.map(a=>(
            <li key={a.cat}>{a.cat}: {a.avg.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-white rounded shadow md:col-span-2">
        <h4 className="font-semibold">Productos Extremos por Categoría</h4>
        {extremes.map(({most,least})=>(
          <div key={most.id}>
            <strong>{most.category}</strong> –
            Más caro: {most.name} ({most.price}),
            Más barato: {least.name} ({least.price})
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
          {avgRatingByCat.map(a=>(
            <li key={a.cat}>{a.cat}: {a.avg.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const productos = [
    { nombre: "Notebook", precio: 1200 },
    { nombre: "Mouse", precio: 20 },
    { nombre: "Teclado", precio: 50 },
    { nombre: "Monitor", precio: 300 },
    { nombre: "Auriculares", precio: 80 },
  ];
  

  const caros = productos.filter(p => p.precio > 100);
  console.log("Productos > $100:", caros);
  

  const descripciones = productos.map(p => `${p.nombre}: $${p.precio}`);
  console.log("Descripciones:", descripciones);
  

  const total = productos.reduce((suma, p) => suma + p.precio, 0);
  console.log("Precio total:", total);
  

  const baratosMinus = productos
    .filter(p => p.precio < 100)
    .map(p => p.nombre.toLowerCase());
  console.log("Baratos (<$100):", baratosMinus);
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SidebarFilters from "./components/SidebarFilters";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import SortSelect from "./components/SortSelect";
import StatsDetailed from "./components/StatsDetailed";
import Charts from "./components/Charts";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showStatsDet, setShowStatsDet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [msg, setMsg] = useState(null);
  const perPage = 20;

useEffect(() => {
  axios
    .get("https://dummyjson.com/products?limit=100")
    .then((res) => {
      const fullProducts = res.data.products.map(p => ({
        id:                  p.id,
        title:               p.title,
        category:            p.category,
        price:               p.price,
        stock:               p.stock,
        rating:              p.rating,
        thumbnail:           p.thumbnail,
        discountPercentage:  p.discountPercentage,
      }));
      setProducts(fullProducts);
    })
    .catch((err) => console.error("Error fetching products:", err));
}, []);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
    setCurrentPage(1);
  };


  let processed = products.filter((p) => {
    const title = p.title.toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase());
    const matchesKeyword =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((kw) => title.includes(kw));
    return matchesSearch && matchesKeyword;
  });

  if (sortBy === "price_asc") processed.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") processed.sort((a, b) => b.price - a.price);
  if (sortBy === "rating_asc") processed.sort((a, b) => a.rating - b.rating);
  if (sortBy === "rating_desc") processed.sort((a, b) => b.rating - a.rating);


  const pageCount = Math.ceil(processed.length / perPage);
  const pageItems = processed.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );


  const descarga = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!processed.length) {
      setMsg({ type: "error", text: "No hay datos para exportar." });
      return;
    }
    const blob = new Blob([JSON.stringify(processed, null, 2)], {
      type: "application/json",
    });
    descarga(blob, "productos.json");
    setMsg({ type: "success", text: "JSON exportado correctamente." });
  };

  const exportCSV = () => {
    if (!processed.length) {
      setMsg({ type: "error", text: "No hay datos para exportar." });
      return;
    }
    const header = Object.keys(processed[0]).join(",");
    const rows = processed
      .map((o) => Object.values(o).map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
    descarga(blob, "productos.csv");
    setMsg({ type: "success", text: "CSV exportado correctamente." });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Navbar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SidebarFilters
            products={products}
            selectedKeywords={selectedKeywords}
            toggleKeyword={toggleKeyword}
          />
        </div>
        <div className="md:col-span-3 space-y-6">
          <StatsPanel products={processed} />

          <div className="flex items-center justify-between">
            <SortSelect value={sortBy} onChange={setSortBy} />
            <button
              onClick={() => setShowStatsDet(!showStatsDet)}
              className="px-3 py-2 border rounded"
            >
              {showStatsDet ? "Ocultar estadísticas" : "Mostrar estadísticas"}
            </button>
          </div>

          {showStatsDet && <StatsDetailed items={processed} />}

          <Charts items={processed} />

          <div className="flex gap-2">
            <button
              onClick={exportJSON}
              className="px-3 py-2 border rounded"
            >
              Export JSON
            </button>
            <button
              onClick={exportCSV}
              className="px-3 py-2 border rounded"
            >
              Export CSV
            </button>
          </div>

          {msg && (
            <div
              className={`p-2 mb-4 rounded ${
                msg.type === "success" ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {msg.text}
            </div>
          )}

          <ProductList products={pageItems} />

          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

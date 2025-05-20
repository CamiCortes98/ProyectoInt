import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SidebarFilters from "./components/SidebarFilters";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    axios.get("/electrodomesticos.json").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const filteredProducts = products.filter((p) => {
    const title = p.title.toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase());
    const matchesKeyword =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((kw) => title.includes(kw));
    return matchesSearch && matchesKeyword;
  });

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
          <StatsPanel products={filteredProducts} />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default App;

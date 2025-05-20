
function SidebarFilters({ products, selectedKeywords, toggleKeyword }) {
  const keywordMap = {};

  products.forEach((p) => {
    const keywords = p.title.toLowerCase().split(" ");
    keywords.forEach((word) => {
      if (word.length > 2) {
        keywordMap[word] = (keywordMap[word] || 0) + 1;
      }
    });
  });

  const sortedKeywords = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="bg-white p-4 shadow rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-3 text-blue-900">Filtrar por palabra clave</h2>
      <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {sortedKeywords.map(([word, count]) => (
          <li key={word}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedKeywords.includes(word)}
                onChange={() => toggleKeyword(word)}
              />
              <span>{word.charAt(0).toUpperCase() + word.slice(1)} ({count})</span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SidebarFilters;

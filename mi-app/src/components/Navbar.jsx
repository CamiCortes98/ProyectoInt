function Navbar({ search, setSearch }) {
  return (
    <nav className="flex items-center justify-between bg-blue-900 text-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-4">
        <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10 rounded" />
        <h1 className="text-2xl font-bold">ElectroStore</h1>
      </div>
      <input
        type="text"
        className="p-2 px-4 rounded-full w-72 text-black focus:outline-none"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}

export default Navbar;
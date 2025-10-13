import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { ShoppingBag, Grid2X2, Star, Filter, Home } from "lucide-react";

const OurProductsLayout = () => {
  const [showSort, setShowSort] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* ===== Sidebar (Desktop) ===== */}
      <aside className="hidden md:flex md:w-64 bg-white dark:bg-gray-800 shadow-xl flex-col justify-between md:h-screen sticky top-0">
        <div className="p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-8 text-center tracking-wide">
            🛒 Our Products
          </h2>

          <nav className="flex flex-col space-y-3 font-semibold">
            <NavLink
              to="/products/all"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <ShoppingBag size={18} /> Products
            </NavLink>

            <NavLink
              to="/products/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Grid2X2 size={18} /> Categories
            </NavLink>

            <NavLink
              to="/products/featured"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gray-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Star size={18} /> Featured
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gray-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Home size={18} /> Home
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
        {/* Top Filter/Search Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-3 md:space-y-0 md:space-x-4 sticky top-0 bg-inherit z-20 pb-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Desktop Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="hidden md:block p-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          {/* Mobile Sort Button */}
          <button
            onClick={() => setShowSort(!showSort)}
            className="block md:hidden p-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition flex items-center gap-2"
          >
            <Filter size={20} /> Sort
          </button>
        </div>

        {/* Mobile Sort Dropdown */}
        {showSort && (
          <div className="fixed top-20 left-0 w-full z-30 p-3 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 shadow-xl">
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setShowSort(false);
              }}
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        )}

        {/* Content Outlet */}
        <div className="w-full">
          <Outlet context={{ searchTerm, sortOption }} />
        </div>
      </main>

      {/* ===== Mobile Bottom Nav ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg flex justify-around items-center py-2 border-t border-gray-200 dark:border-gray-700 z-50">
        {[
          { to: "/products/all", icon: <ShoppingBag size={20} />, label: "All" },
          { to: "/products/categories", icon: <Grid2X2 size={20} />, label: "Cats" },
          { to: "/products/featured", icon: <Star size={20} />, label: "Favs" },
          { to: "/", icon: <Home size={20} />, label: "Home" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default OurProductsLayout;

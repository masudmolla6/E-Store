import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { ShoppingBag, Grid2X2, Star, Filter } from "lucide-react";

const OurProductsLayout = () => {
  const [showSort, setShowSort] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // ✅ new sort state

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="md:w-64 w-full bg-white dark:bg-gray-800 shadow-xl rounded-b-3xl md:rounded-none flex-shrink-0 md:h-screen md:sticky md:top-0">
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-8 text-center tracking-wide animate-pulse">
            🛒 Our Products
          </h2>

          <nav className="flex flex-row md:flex-col justify-around md:justify-start md:space-y-4 text-lg font-semibold">
            <NavLink
              to="/products/all"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <ShoppingBag size={22} /> All Products
            </NavLink>

            <NavLink
              to="/products/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gray-700 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Grid2X2 size={22} /> Categories
            </NavLink>

            <NavLink
              to="/products/featured"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gray-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Star size={22} /> Featured
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
        {/* Top Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-3 md:space-y-0 md:space-x-4 sticky top-0 bg-inherit z-20 pb-3">
          {/* ✅ Search */}
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* ✅ Desktop Sort Dropdown */}
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

          {/* ✅ Mobile Sort Button */}
          <button
            onClick={() => setShowSort(!showSort)}
            className="block md:hidden p-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition flex items-center gap-2"
          >
            <Filter size={20} /> Sort
          </button>
        </div>

        {/* ✅ Mobile Sort Dropdown */}
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

        {/* ✅ Pass searchTerm + sortOption to Outlet */}
        <div className="w-full">
          <Outlet context={{ searchTerm, sortOption }} />
        </div>
      </main>
    </div>
  );
};

export default OurProductsLayout;

import { useMemo, useState } from "react";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";

function Shop() {
  const { products, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <PageWrapper>
      <main className="page-container">
        <div className="section-header">
          <h2>Shop Vegetables</h2>

          <div className="top-controls">
            <input
              className="search-input"
              type="text"
              placeholder="Search vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="filter-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      </main>
    </PageWrapper>
  );
}

export default Shop;
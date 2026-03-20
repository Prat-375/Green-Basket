import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, onViewDetails }) {
  if (products.length === 0) {
    return <p className="empty-products">No vegetables found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

export default ProductList;
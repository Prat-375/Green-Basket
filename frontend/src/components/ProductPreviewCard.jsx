function ProductPreviewCard({ product }) {
  return (
    <div className="card preview-card">
      <div className="emoji">{product.image}</div>
      <h3>{product.name}</h3>
      <p className="category-badge">{product.category}</p>
    </div>
  );
}

export default ProductPreviewCard;
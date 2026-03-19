import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../context/CartContext";

function Home() {
  const { products, addToCart } = useCart();

  // pick first 6 as featured (simple logic)
  const featuredProducts = products.slice(0, 6);

  return (
    <PageWrapper>
      <>
        {/* HERO */}
        <section className="hero-premium">
          <div className="hero-content">
            <span className="hero-badge">🥬 Fresh • Organic • Fast Delivery</span>

            <h1>
              Fresh Vegetables <br />
              <span>Delivered to Your Door</span>
            </h1>

            <p>
              Shop healthy, handpicked vegetables with fast delivery and
              unbeatable freshness.
            </p>

            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                🛒 Start Shopping
              </Link>

              {/* 👇 THIS NOW SCROLLS */}
              <a href="#featured" className="btn-secondary">
                Browse Products ↓
              </a>
            </div>
          </div>

          <div className="hero-decor">
            <span>🥕</span>
            <span>🥦</span>
            <span>🍅</span>
            <span>🧅</span>
          </div>
        </section>

        {/* 🔥 FEATURED SECTION */}
        <section id="featured" className="featured-section">
          <div className="featured-header">
            <h2>Popular Picks</h2>
            <p>Handpicked fresh items just for you</p>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card">
                <div className="emoji">{product.image}</div>
                <h3>{product.name}</h3>
                <p>
                  €{product.price} / {product.unit}
                </p>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="featured-footer">
            <Link to="/shop" className="btn-primary">
              View All Products →
            </Link>
          </div>
        </section>
      </>
    </PageWrapper>
  );
}

export default Home;
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../context/CartContext";
import ProductPreviewCard from "../components/ProductPreviewCard";
import HomeLoginBanner from "../components/HomeLoginBanner";

function Home() {
  const { products } = useCart();
  const featuredProducts = products.slice(0, 6);

  return (
    <PageWrapper>
      <>
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

        <section id="featured" className="featured-section">
          <div className="featured-header">
            <h2>Popular Picks</h2>
            <p>Take a look at what we currently have available</p>
          </div>

          <HomeLoginBanner />

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductPreviewCard key={product.id} product={product} />
            ))}
          </div>

          <div className="featured-footer">
            <Link to="/shop" className="btn-primary">
              View Full Catalog →
            </Link>
          </div>
        </section>
      </>
    </PageWrapper>
  );
}

export default Home;
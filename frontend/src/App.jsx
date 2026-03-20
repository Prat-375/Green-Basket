import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccess from "./pages/OrderSuccess";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
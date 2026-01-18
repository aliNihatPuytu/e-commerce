import { Routes, Route, Navigate } from "react-router-dom";
import PageContent from "./layout/PageContent";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import PagesPage from "./pages/PagesPage";
import PricingPage from "./pages/PricingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import TeamPage from "./pages/TeamPage";

import RequireAuth from "./routes/RequireAuth";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white text-[#252B42]">
      <Routes>
        <Route element={<PageContent />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pages" element={<PagesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/register" element={<Navigate to="/signup" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

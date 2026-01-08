import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b flex items-center justify-between px-4 py-3">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border flex items-center justify-center">
          E
        </div>
        <span className="text-sm font-semibold">e-commerce</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link to="/products" className="text-sm">
          Products
        </Link>
        <Link to="/cart" className="flex items-center gap-2 text-sm">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
        </Link>
        <Link to="/login" className="flex items-center gap-2 text-sm">
          <User size={18} />
          <span className="hidden sm:inline">Login</span>
        </Link>
      </nav>
    </header>
  );
}

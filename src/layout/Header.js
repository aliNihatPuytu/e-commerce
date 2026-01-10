import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  User,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="w-full bg-[#252B42] text-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1439px] items-center justify-between px-6">
          <div className="flex items-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          <div className="text-sm font-bold">
            Follow Us and get a chance to win 80% off
          </div>

          <div className="flex items-center gap-3 text-sm font-bold">
            <span>Follow Us :</span>
            <div className="flex items-center gap-3">
              <Instagram className="h-4 w-4" />
              <Youtube className="h-4 w-4" />
              <Facebook className="h-4 w-4" />
              <Twitter className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1439px] items-center justify-between px-6">
          <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">
            Bandage
          </div>

          <nav className="hidden items-center gap-5 text-sm font-bold text-[#737373] md:flex">
            <Link className="text-[#23A6F0]" to="/">
              Home
            </Link>

            <div className="flex items-center gap-1">
              <Link to="/shop">Shop</Link>
              <ChevronDown className="h-3.5 w-3.5 translate-y-[1px] text-[#737373]" strokeWidth={2.5} />
            </div>

            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>

            <Link to="/pages">Pages</Link>
          </nav>

          <div className="flex items-center gap-5 text-sm font-bold text-[#23A6F0]">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Login / Register</span>
            </div>

            <button className="inline-flex items-center justify-center" type="button">
              <Search className="h-4 w-4" />
            </button>

            <button className="inline-flex items-center gap-1" type="button">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-xs font-bold leading-none">1</span>
            </button>

            <button className="inline-flex items-center gap-1" type="button">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-bold leading-none">1</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

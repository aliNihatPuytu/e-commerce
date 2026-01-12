import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isShopPage = location.pathname === "/shop";
  const isContactPage = location.pathname === "/contact";
  const isTeamPage = location.pathname === "/team";

  if (isContactPage || isTeamPage) {
    return (
      <header className="w-full bg-white">
        <div className="hidden md:block">
          <div className="mx-auto flex h-[91px] w-full max-w-[1050px] items-center justify-between px-4">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

            <nav className="flex items-center gap-6 text-sm font-bold text-[#737373]">
              <Link to="/" className="text-[#737373]">
                Home
              </Link>
              <Link to="/product" className="text-[#737373]">
                Product
              </Link>
              <Link to="/pricing" className="text-[#737373]">
                Pricing
              </Link>
              <Link to="/contact" className={isContactPage ? "text-[#252B42]" : "text-[#737373]"}>
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-bold text-[#23A6F0]">
                Login
              </Link>

              <Link
                to="/login"
                className="inline-flex h-[52px] items-center gap-2 rounded-[5px] bg-[#23A6F0] px-10 text-sm font-bold text-white"
              >
                Become a member
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="mx-auto flex w-full max-w-[414px] items-center justify-between px-[13px] py-4">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

            <div className="flex items-center gap-2 text-[#252B42]">
              <button
                type="button"
                onClick={() => navigate("/product")}
                aria-label="Search"
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                aria-label="Cart"
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Menu"
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="w-full bg-[#F6F6F6] py-10">
              <nav className="mx-auto flex w-full max-w-[414px] flex-col items-center gap-[30px] px-[13px] text-[30px] font-normal leading-[45px] text-[#737373]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/product" onClick={() => setMobileMenuOpen(false)}>
                  Product
                </Link>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={isContactPage ? "text-[#252B42]" : "text-[#737373]"}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="w-full">
      <div className="hidden md:block">
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

            <div className="text-sm font-bold">Follow Us and get a chance to win 80% off</div>

            <div className="flex items-center gap-3 text-sm font-bold">
              <span>Follow Us :</span>
              <div className="flex items-center gap-3">
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Youtube">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="mx-auto flex h-[58px] w-full max-w-[1439px] items-center justify-between px-6">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

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
              <Link to="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Login / Register</span>
              </Link>

              <button
                className="inline-flex items-center justify-center"
                type="button"
                onClick={() => navigate("/product")}
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <button
                className="inline-flex items-center gap-1"
                type="button"
                onClick={() => navigate("/cart")}
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs font-bold leading-none">1</span>
              </button>

              <button
                className="inline-flex items-center gap-1"
                type="button"
                onClick={() => navigate("/profile")}
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                <span className="text-xs font-bold leading-none">1</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="w-full bg-white">
          <div className="mx-auto flex w-full max-w-[414px] items-center justify-between px-[13px] py-4">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

            <div className="flex items-center gap-3 text-[#23A6F0]">
              {!isShopPage && (
                <>
                  <button
                    type="button"
                    onClick={() => navigate("/product")}
                    aria-label="Search"
                    className="inline-flex h-9 w-9 items-center justify-center"
                  >
                    <Search className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    aria-label="Cart"
                    className="inline-flex h-9 w-9 items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    aria-label="Wishlist"
                    className="inline-flex h-9 w-9 items-center justify-center"
                  >
                    <Heart className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    aria-label="Account"
                    className="inline-flex h-9 w-9 items-center justify-center"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Menu"
                className="inline-flex h-9 w-9 items-center justify-center text-[#252B42]"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mx-auto w-full max-w-[414px] px-[13px] pb-10 pt-6">
              <nav className="mx-auto flex flex-col items-center gap-[30px] text-[30px] font-normal leading-[45px] text-[#737373]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                  Shop
                </Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                <Link to="/pages" onClick={() => setMobileMenuOpen(false)}>
                  Pages
                </Link>
              </nav>

              <div className="mt-8 flex flex-col items-center gap-6">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-[30px] font-normal leading-[45px] text-[#23A6F0]"
                >
                  <User className="h-6 w-6" />
                  <span>Login / Register</span>
                </Link>

                <div className="flex flex-col items-center gap-6 text-[#23A6F0]">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/product");
                    }}
                    aria-label="Search"
                    className="inline-flex h-10 w-10 items-center justify-center"
                  >
                    <Search className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/cart");
                    }}
                    aria-label="Cart"
                    className="inline-flex h-10 w-10 items-center justify-center"
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                    aria-label="Wishlist"
                    className="inline-flex h-10 w-10 items-center justify-center"
                  >
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { clearAuth, isAuthed } from "../auth/auth";
import { showCenterNotice } from "../utils/centerNotice";
import { ensureCategories, slugifyTr } from "../store/actions/productActions";

function normalizeGender(gender) {
  const g = String(gender || "").trim().toLowerCase();
  if (!g) return "";
  if (
    g === "k" ||
    g === "kadin" ||
    g === "kadın" ||
    g === "woman" ||
    g === "women" ||
    g === "female" ||
    g === "f"
  )
    return "k";
  if (g === "e" || g === "erkek" || g === "man" || g === "men" || g === "male" || g === "m")
    return "e";
  return "";
}

function toGenderSegment(gender) {
  const ng = normalizeGender(gender);
  if (ng === "k") return "kadin";
  if (ng === "e") return "erkek";
  return "kadin";
}

function toCategoryNameSegment(cat) {
  const codePart = String(cat?.code || "").split(":")[1] || "";
  const raw = codePart || String(cat?.title || "");
  return slugifyTr(raw);
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const categories = useSelector((s) => s?.product?.categories) || [];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [authed, setAuthed] = useState(isAuthed());

  const isShopPage = location.pathname.startsWith("/shop");
  const isContactPage = location.pathname === "/contact";
  const isTeamPage = location.pathname === "/team";

  useEffect(() => {
    const sync = () => setAuthed(isAuthed());
    sync();
    window.addEventListener("auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    setShopOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (shopOpen && (!Array.isArray(categories) || categories.length === 0)) {
      dispatch(ensureCategories());
    }
  }, [shopOpen, categories, dispatch]);

  const { kadinCats, erkekCats } = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    const k = list.filter((c) => normalizeGender(c?.gender) === "k");
    const e = list.filter((c) => normalizeGender(c?.gender) === "e");
    return { kadinCats: k, erkekCats: e };
  }, [categories]);

  const accountHref = useMemo(() => (authed ? "/profile" : "/login"), [authed]);
  const accountLabel = useMemo(() => (authed ? "My Account" : "Login / Register"), [authed]);

  const onLogout = () => {
    clearAuth();
    setAuthed(false);
    showCenterNotice({ type: "info", title: "Signed out", subtitle: "", duration: 2400 });
    navigate("/", { replace: true });
  };

  const onCategoryClick = (cat) => {
    const gender = toGenderSegment(cat?.gender);
    const name = toCategoryNameSegment(cat);
    const id = cat?.id;
    setShopOpen(false);
    setMobileMenuOpen(false);
    navigate(`/shop/${gender}/${name}/${id}`);
  };

  const Dropdown = (
    <div className="absolute left-1/2 top-full z-50 mt-4 w-[560px] -translate-x-1/2 rounded-md border border-[#E6E6E6] bg-white shadow-lg">
      <div className="grid grid-cols-2 gap-10 px-8 py-7">
        <div>
          <div className="text-sm font-bold text-[#252B42]">Kadin</div>
          <div className="mt-6 flex flex-col gap-4 text-sm font-bold text-[#737373]">
            {kadinCats.map((c) => (
              <button
                key={`k-${c.id}`}
                type="button"
                onClick={() => onCategoryClick(c)}
                className="text-left hover:text-[#252B42]"
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-[#252B42]">Erkek</div>
          <div className="mt-6 flex flex-col gap-4 text-sm font-bold text-[#737373]">
            {erkekCats.map((c) => (
              <button
                key={`e-${c.id}`}
                type="button"
                onClick={() => onCategoryClick(c)}
                className="text-left hover:text-[#252B42]"
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
              <Link to={accountHref} className="text-sm font-bold text-[#23A6F0]">
                {accountLabel}
              </Link>

              {authed ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex h-[52px] items-center rounded-[5px] border border-[#23A6F0] px-10 text-sm font-bold text-[#23A6F0]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex h-[52px] items-center gap-2 rounded-[5px] bg-[#23A6F0] px-10 text-sm font-bold text-white"
                >
                  Become a member
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
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

                <Link to={accountHref} onClick={() => setMobileMenuOpen(false)} className="text-[#23A6F0]">
                  {accountLabel}
                </Link>

                {authed && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-[#23A6F0]"
                  >
                    Logout
                  </button>
                )}
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

              <div
                className="relative flex items-center gap-1"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!shopOpen) {
                      setShopOpen(true);
                      if (!Array.isArray(categories) || categories.length === 0) dispatch(ensureCategories());
                      return;
                    }
                    navigate("/shop");
                  }}
                  className={["inline-flex items-center gap-1", isShopPage ? "text-[#252B42]" : ""].join(" ")}
                >
                  Shop
                  <ChevronDown className="h-3.5 w-3.5 translate-y-[1px] text-[#737373]" strokeWidth={2.5} />
                </button>

                {shopOpen ? (
                  <>
                    <div className="absolute left-0 top-full h-4 w-full" />
                    {Dropdown}
                  </>
                ) : null}
              </div>

              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/pages">Pages</Link>
            </nav>

            <div className="flex items-center gap-5 text-sm font-bold text-[#23A6F0]">
              <Link to={accountHref} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{accountLabel}</span>
              </Link>

              {authed && (
                <button type="button" onClick={onLogout} className="text-sm font-bold text-[#23A6F0]">
                  Logout
                </button>
              )}

              <button
                className="inline-flex items-center justify-center"
                type="button"
                onClick={() => navigate("/product")}
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <button className="inline-flex items-center gap-1" type="button" onClick={() => navigate("/cart")} aria-label="Cart">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs font-bold leading-none">1</span>
              </button>

              <button className="inline-flex items-center gap-1" type="button" onClick={() => navigate("/profile")} aria-label="Wishlist">
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
                  <button type="button" onClick={() => navigate("/product")} aria-label="Search" className="inline-flex h-9 w-9 items-center justify-center">
                    <Search className="h-5 w-5" />
                  </button>

                  <button type="button" onClick={() => navigate("/cart")} aria-label="Cart" className="inline-flex h-9 w-9 items-center justify-center">
                    <ShoppingCart className="h-5 w-5" />
                  </button>

                  <button type="button" onClick={() => navigate("/profile")} aria-label="Wishlist" className="inline-flex h-9 w-9 items-center justify-center">
                    <Heart className="h-5 w-5" />
                  </button>

                  <button type="button" onClick={() => navigate(accountHref)} aria-label="Account" className="inline-flex h-9 w-9 items-center justify-center">
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

                <Link to={accountHref} onClick={() => setMobileMenuOpen(false)} className="text-[#23A6F0]">
                  {accountLabel}
                </Link>

                {authed && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-[30px] font-normal leading-[45px] text-[#23A6F0]"
                  >
                    Logout
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

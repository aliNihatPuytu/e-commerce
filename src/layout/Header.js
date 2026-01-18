import { useEffect, useMemo, useRef, useState } from "react";
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
import { removeFromCart, setCartItemCount } from "../store/actions/shoppingCartActions";

function normalizeGender(gender) {
  const g = String(gender || "").trim().toLowerCase();
  if (!g) return "";
  if (g === "k" || g === "kadin" || g === "kadın" || g === "woman" || g === "women" || g === "female" || g === "f") return "k";
  if (g === "e" || g === "erkek" || g === "man" || g === "men" || g === "male" || g === "m") return "e";
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

function pickId(p) {
  return p?.id ?? p?.product_id ?? p?.productId;
}

function pickTitle(p) {
  return String(p?.name || p?.title || p?.product_name || p?.productName || "Product");
}

function pickImage(p) {
  const img =
    p?.img ||
    p?.image ||
    p?.thumbnail ||
    p?.thumbnailUrl ||
    p?.thumbnail_url ||
    (Array.isArray(p?.images) ? p.images[0] : null);

  if (!img) return "";
  if (typeof img === "string") return img;
  return img?.url || img?.src || "";
}

function pickPriceNumber(p) {
  const n = Number(p?.price);
  return Number.isFinite(n) ? n : 0;
}

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const categories = useSelector((s) => s?.product?.categories) || [];
  const cart = useSelector((s) => s?.shoppingCart?.cart) || [];
  const likedIds = useSelector((s) => s?.product?.likedIds) || [];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authed, setAuthed] = useState(isAuthed());

  const cartWrapRef = useRef(null);
  const cartTimerRef = useRef(null);

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
    setCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (shopOpen && (!Array.isArray(categories) || categories.length === 0)) {
      dispatch(ensureCategories());
    }
  }, [shopOpen, categories, dispatch]);

  useEffect(() => {
    const onOpen = () => {
      setCartOpen(true);
      if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
      cartTimerRef.current = setTimeout(() => setCartOpen(false), 2600);
    };

    window.addEventListener("cart:open", onOpen);
    return () => {
      window.removeEventListener("cart:open", onOpen);
      if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cartOpen) return;

    const onDown = (e) => {
      const el = cartWrapRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      setCartOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [cartOpen]);

  const { kadinCats, erkekCats } = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    const k = list.filter((c) => normalizeGender(c?.gender) === "k");
    const e = list.filter((c) => normalizeGender(c?.gender) === "e");
    return { kadinCats: k, erkekCats: e };
  }, [categories]);

  const accountHref = useMemo(() => (authed ? "/profile" : "/login"), [authed]);
  const accountLabel = useMemo(() => (authed ? "My Account" : "Login / Register"), [authed]);

  const cartCount = useMemo(() => cart.reduce((sum, x) => sum + (Number(x.count) || 0), 0), [cart]);
  const wishCount = useMemo(() => likedIds.length, [likedIds]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, x) => sum + pickPriceNumber(x.product) * (Number(x.count) || 0), 0);
  }, [cart]);

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
              <button key={`k-${c.id}`} type="button" onClick={() => onCategoryClick(c)} className="text-left hover:text-[#252B42]">
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-[#252B42]">Erkek</div>
          <div className="mt-6 flex flex-col gap-4 text-sm font-bold text-[#737373]">
            {erkekCats.map((c) => (
              <button key={`e-${c.id}`} type="button" onClick={() => onCategoryClick(c)} className="text-left hover:text-[#252B42]">
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CartDropdown = (
    <div className="absolute right-0 top-full z-50 mt-3 w-[380px] overflow-hidden rounded border border-[#E6E6E6] bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-[#E6E6E6] bg-[#FAFAFA] px-4 py-3">
        <div className="text-sm font-bold text-[#252B42]">Shopping Cart</div>
        <div className="text-xs font-bold text-[#737373]">{cartCount} item</div>
      </div>

      {cart.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm font-semibold text-[#737373]">Sepetiniz boş</div>
      ) : (
        <>
          <div className="max-h-[320px] overflow-auto">
            {cart.map((row) => {
              const p = row.product;
              const id = pickId(p);
              const title = pickTitle(p);
              const img = pickImage(p);
              const price = pickPriceNumber(p);
              const count = Number(row.count) || 1;

              return (
                <div key={String(id)} className="flex gap-3 border-b border-[#E6E6E6] px-4 py-4">
                  <div className="h-14 w-14 overflow-hidden rounded bg-[#F6F6F6]">
                    {img ? <img src={img} alt={title} className="h-full w-full object-cover" /> : null}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${id}`)}
                      className="line-clamp-2 text-left text-sm font-bold text-[#252B42]"
                    >
                      {title}
                    </button>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-xs font-bold text-[#737373]">{fmt(price)}</div>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(id))}
                        className="text-xs font-bold text-[#23A6F0]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex h-8 items-center overflow-hidden rounded border border-[#E6E6E6] bg-white">
                        <button
                          type="button"
                          onClick={() => dispatch(setCartItemCount(id, Math.max(1, count - 1)))}
                          className="h-8 w-8 text-sm font-bold text-[#252B42]"
                        >
                          -
                        </button>
                        <div className="flex h-8 w-9 items-center justify-center text-sm font-bold text-[#252B42]">
                          {count}
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(setCartItemCount(id, count + 1))}
                          className="h-8 w-8 text-sm font-bold text-[#252B42]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-bold text-[#252B42]">{fmt(price * count)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-[#737373]">Subtotal</div>
              <div className="text-lg font-bold text-[#252B42]">{fmt(subtotal)}</div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  navigate("/cart");
                }}
                className="flex h-10 flex-1 items-center justify-center rounded border border-[#23A6F0] bg-white text-sm font-bold text-[#23A6F0]"
              >
                View Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout");
                }}
                className="flex h-10 flex-1 items-center justify-center rounded bg-[#23A6F0] text-sm font-bold text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (isContactPage || isTeamPage) {
    return (
      <header className="w-full bg-white">
        <div className="hidden md:block">
          <div className="mx-auto flex h-[91px] w-full max-w-[1050px] items-center justify-between px-4">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

            <nav className="flex items-center gap-6 text-sm font-bold text-[#737373]">
              <Link to="/" className="text-[#737373]">Home</Link>
              <Link to="/product" className="text-[#737373]">Product</Link>
              <Link to="/pricing" className="text-[#737373]">Pricing</Link>
              <Link to="/contact" className={isContactPage ? "text-[#252B42]" : "text-[#737373]"}>Contact</Link>
            </nav>

            <div className="flex items-center gap-6">
              <Link to={accountHref} className="text-sm font-bold text-[#23A6F0]">{accountLabel}</Link>

              {authed ? (
                <button type="button" onClick={onLogout} className="inline-flex h-[52px] items-center rounded-[5px] border border-[#23A6F0] px-10 text-sm font-bold text-[#23A6F0]">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="inline-flex h-[52px] items-center gap-2 rounded-[5px] bg-[#23A6F0] px-10 text-sm font-bold text-white">
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
              <button type="button" onClick={() => navigate("/product")} aria-label="Search" className="inline-flex h-9 w-9 items-center justify-center">
                <Search className="h-5 w-5" />
              </button>

              <button type="button" onClick={() => navigate("/cart")} aria-label="Cart" className="inline-flex h-9 w-9 items-center justify-center">
                <ShoppingCart className="h-5 w-5" />
              </button>

              <button type="button" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Menu" className="inline-flex h-9 w-9 items-center justify-center">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="w-full bg-[#F6F6F6] py-10">
              <nav className="mx-auto flex w-full max-w-[414px] flex-col items-center gap-[30px] px-[13px] text-[30px] font-normal leading-[45px] text-[#737373]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/product" onClick={() => setMobileMenuOpen(false)}>Product</Link>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={isContactPage ? "text-[#252B42]" : "text-[#737373]"}>Contact</Link>

                <Link to={accountHref} onClick={() => setMobileMenuOpen(false)} className="text-[#23A6F0]">
                  {accountLabel}
                </Link>

                {authed && (
                  <button type="button" onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="text-[#23A6F0]">
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
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Youtube"><Youtube className="h-4 w-4" /></a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="mx-auto flex h-[58px] w-full max-w-[1439px] items-center justify-between px-6">
            <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>

            <nav className="hidden items-center gap-5 text-sm font-bold text-[#737373] md:flex">
              <Link className="text-[#23A6F0]" to="/">Home</Link>

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

              <button className="inline-flex items-center justify-center" type="button" onClick={() => navigate("/product")} aria-label="Search">
                <Search className="h-4 w-4" />
              </button>

              <div
                ref={cartWrapRef}
                className="relative"
                onMouseEnter={() => {
                  setCartOpen(true);
                  if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
                }}
                onMouseLeave={() => {
                  if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
                  cartTimerRef.current = setTimeout(() => setCartOpen(false), 350);
                }}
              >
                <button
                  className="inline-flex items-center gap-1"
                  type="button"
                  onClick={() => setCartOpen((v) => !v)}
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-xs font-bold leading-none">{cartCount}</span>
                </button>

                {cartOpen ? CartDropdown : null}
              </div>

              <button className="inline-flex items-center gap-1" type="button" onClick={() => navigate("/profile")} aria-label="Wishlist">
                <Heart className="h-4 w-4" />
                <span className="text-xs font-bold leading-none">{wishCount}</span>
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

                  <button type="button" onClick={() => setCartOpen((v) => !v)} aria-label="Cart" className="inline-flex h-9 w-9 items-center justify-center">
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

          {cartOpen ? (
            <div className="mx-auto w-full max-w-[414px] px-[13px] pb-4">{CartDropdown}</div>
          ) : null}

          {mobileMenuOpen && (
            <div className="mx-auto w-full max-w-[414px] px-[13px] pb-10 pt-6">
              <nav className="mx-auto flex flex-col items-center gap-[30px] text-[30px] font-normal leading-[45px] text-[#737373]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <Link to="/pages" onClick={() => setMobileMenuOpen(false)}>Pages</Link>

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

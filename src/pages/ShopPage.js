import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutGrid, List, ChevronRight, ChevronDown, ShoppingCart, Heart } from "lucide-react";
import Container from "../layout/Container";
import ShopCategoryCard from "../components/ShopCategoryCard";
import ProductCard from "../components/ProductCard";

import c1 from "../assets/images/shop-page/cloths-1.png";
import c2 from "../assets/images/shop-page/cloths-2.png";
import c3 from "../assets/images/shop-page/cloths-3.png";
import c4 from "../assets/images/shop-page/cloths-4.png";
import c5 from "../assets/images/shop-page/cloths-5.png";

import brand1 from "../assets/images/shop-page/brand-1.png";
import brand2 from "../assets/images/shop-page/brand-2.png";
import brand3 from "../assets/images/shop-page/brand-3.png";
import brand4 from "../assets/images/shop-page/brand-4.png";
import brand5 from "../assets/images/shop-page/brand-5.png";
import brand6 from "../assets/images/shop-page/brand-6.png";

import {
  ensureCategories,
  fetchProducts,
  setFilter,
  setOffset,
  setSort,
  slugifyTr,
} from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import { initLikes, toggleLike } from "../store/actions/productActions";

const Dot = ({ className }) => <span className={`h-2.5 w-2.5 rounded-full ${className}`} />;

function MobileProductCard({ img, title, dept, price, sale }) {
  return (
    <div className="flex h-[615px] w-[348px] flex-col items-center bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-[427px] w-full bg-[#F6F6F6]">{img ? <img src={img} alt={title} className="h-full w-full object-cover" /> : null}</div>

      <div className="flex w-full flex-1 flex-col items-center justify-center pt-6 text-center">
        <div className="w-[328px] space-y-2 pb-8">
          <div className="text-base font-bold text-[#252B42]">{title}</div>
          <div className="text-sm font-bold text-[#737373]">{dept}</div>

          <div className="flex items-center justify-center gap-2">
            <div className="text-sm font-bold text-[#BDBDBD]">{price}</div>
            <div className="text-sm font-bold text-[#23856D]">{sale}</div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <Dot className="bg-[#23A6F0]" />
            <Dot className="bg-[#23856D]" />
            <Dot className="bg-[#E77C40]" />
            <Dot className="bg-[#252B42]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function toGenderSegment(gender) {
  const g = String(gender || "").toLowerCase();
  if (g === "k") return "kadin";
  if (g === "e") return "erkek";
  return "kadin";
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

function formatMoney(v) {
  if (v == null || v === "") return "";
  if (typeof v === "number") return `$${v.toFixed(2)}`;
  const n = Number(v);
  if (Number.isFinite(n)) return `$${n.toFixed(2)}`;
  return String(v);
}

function pickTitle(p) {
  return String(p?.title || p?.name || p?.product_name || p?.productName || "Product");
}

function pickDept(p) {
  const catTitle = p?.category?.title || p?.category?.name || p?.category_title || p?.categoryTitle;
  return String(p?.department || p?.dept || catTitle || "");
}

function pickProductId(p) {
  return p?.id ?? p?.product_id ?? p?.productId;
}

function pickCategoryId(p) {
  return p?.category_id ?? p?.categoryId ?? p?.category?.id ?? p?.category?.category_id;
}

function pickPriceOld(p) {
  return p?.oldPrice ?? p?.priceOld ?? p?.price_old ?? p?.price;
}

function pickSale(p) {
  return p?.sale ?? p?.salePrice ?? p?.sale_price ?? p?.discountedPrice ?? p?.discounted_price ?? p?.price;
}

export default function ShopPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId: urlCategoryId } = useParams();

  const categories = useSelector((s) => s?.product?.categories) || [];
  const productList = useSelector((s) => s?.product?.productList) || [];
  const total = useSelector((s) => s?.product?.total) || 0;
  const fetchState = useSelector((s) => s?.product?.fetchState) || "NOT_FETCHED";
  const limit = useSelector((s) => s?.product?.limit) || 25;
  const offset = useSelector((s) => s?.product?.offset) || 0;
  const filter = useSelector((s) => s?.product?.filter) || "";
  const sort = useSelector((s) => s?.product?.sort) || "";
  const likedIds = useSelector((s) => s?.product?.likedIds) || [];

  const [view, setView] = useState("grid");
  const [sortDraft, setSortDraft] = useState(sort);

  useEffect(() => {
    dispatch(ensureCategories());
    dispatch(initLikes());
  }, [dispatch]);

  useEffect(() => {
    setSortDraft(sort);
  }, [sort]);

  const parsedCategoryId = useMemo(() => {
    const n = Number(urlCategoryId);
    return Number.isFinite(n) ? n : null;
  }, [urlCategoryId]);

  const brands = useMemo(() => [brand1, brand2, brand3, brand4, brand5, brand6], []);

  const categoryCards = useMemo(() => {
    const imgs = [c1, c2, c3, c4, c5];
    const list = Array.isArray(categories) ? categories : [];
    return list.slice(0, 5).map((c, i) => ({ ...c, image: imgs[i % imgs.length], items: "5 Items" }));
  }, [categories]);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(
        fetchProducts({
          category: parsedCategoryId ?? undefined,
          filter,
          sort,
          limit,
          offset,
        })
      );
    }, 300);

    return () => clearTimeout(t);
  }, [dispatch, parsedCategoryId, filter, sort, limit, offset]);

  const totalPages = useMemo(() => {
    const t = Number(total) || 0;
    const l = Number(limit) || 25;
    const pages = l > 0 ? Math.ceil(t / l) : 1;
    return pages > 0 ? pages : 1;
  }, [total, limit]);

  const currentPage = useMemo(() => {
    const l = Number(limit) || 25;
    const o = Number(offset) || 0;
    return l > 0 ? Math.floor(o / l) + 1 : 1;
  }, [limit, offset]);

  const pageButtons = useMemo(() => {
    const tp = totalPages;
    if (tp <= 3) return Array.from({ length: tp }, (_, i) => i + 1);
    const start = Math.max(1, Math.min(currentPage - 1, tp - 2));
    return [start, start + 1, start + 2];
  }, [totalPages, currentPage]);

  const onCategoryClick = (cat) => {
    const gender = toGenderSegment(cat?.gender);
    const name = slugifyTr(String(cat?.title || ""));
    const id = cat?.id;
    if (!id) return;
    dispatch(setOffset(0));
    navigate(`/shop/${gender}/${name}/${id}`);
  };

  const onApply = () => {
    dispatch(setSort(sortDraft));
    dispatch(setOffset(0));
  };

  const onPage = (p) => {
    const page = Number(p);
    if (!Number.isFinite(page) || page < 1) return;
    if (page > totalPages) return;
    dispatch(setOffset((page - 1) * limit));
  };

  const isLoading = fetchState === "FETCHING";

  const findCategory = (id) => {
    const list = Array.isArray(categories) ? categories : [];
    return list.find((c) => String(c?.id) === String(id));
  };

  const buildProductUrl = (p) => {
    const pid = pickProductId(p);
    if (!pid) return null;

    const cid = parsedCategoryId ?? pickCategoryId(p);
    if (!cid) return `/product/${pid}`;

    const cat = findCategory(cid) || p?.category || null;
    const gender = toGenderSegment(cat?.gender);
    const categoryName = slugifyTr(String(cat?.title || cat?.name || "category"));
    const productNameSlug = slugifyTr(pickTitle(p));

    return `/shop/${gender}/${categoryName}/${cid}/${productNameSlug}/${pid}`;
  };

  const onQuickAdd = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(p));
    window.dispatchEvent(new Event("cart:open"));
  };

  const onLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(id));
  };

  return (
    <div className="w-full bg-white">
      <Container className="flex flex-col pt-8">
        <div className="flex w-full items-center justify-between">
          <div className="text-2xl font-bold text-[#252B42]">Shop</div>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm font-bold text-[#252B42]">Home</span>
            <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
            <span className="text-sm font-bold text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </Container>

      <div className="mx-auto mt-8 w-full max-w-[333px] px-0 sm:max-w-[1088px] sm:px-4 md:px-0">
        <div className="grid w-full grid-cols-1 gap-[15px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categoryCards.map((c) => (
            <ShopCategoryCard
              key={c.id}
              image={c.image}
              title={String(c.title || "").toUpperCase()}
              items={c.items}
              className="h-[300px] sm:h-[223px]"
              onClick={() => onCategoryClick(c)}
            />
          ))}
        </div>
      </div>

      <Container className="flex flex-col pb-12">
        <div className="mt-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center">
          <div className="text-center text-sm font-semibold text-[#737373] lg:text-left">
            Toplam {total} sonuç gösteriliyor
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-center lg:gap-4">
            <div className="text-sm font-semibold text-[#737373]">Görünüm:</div>

            <button
              type="button"
              onClick={() => setView("grid")}
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="Grid view"
            >
              <LayoutGrid className={`h-4 w-4 ${view === "grid" ? "text-[#252B42]" : "text-[#737373]"}`} />
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="List view"
            >
              <List className={`h-4 w-4 ${view === "list" ? "text-[#252B42]" : "text-[#737373]"}`} />
            </button>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row lg:justify-end">
            <div className="w-full max-w-[220px]">
              <input
                value={filter}
                onChange={(e) => {
                  dispatch(setFilter(e.target.value));
                  dispatch(setOffset(0));
                }}
                placeholder="Filtre"
                className="h-10 w-full rounded border border-[#E6E6E6] bg-white px-4 text-sm text-[#737373] outline-none"
              />
            </div>

            <div className="relative w-full max-w-[220px]">
              <select
                value={sortDraft}
                onChange={(e) => setSortDraft(e.target.value)}
                className="h-10 w-full appearance-none rounded border border-[#E6E6E6] bg-[#F9F9F9] px-4 pr-10 text-sm text-[#737373] outline-none"
              >
                <option value="">Sırala</option>
                <option value="price:asc">price:asc</option>
                <option value="price:desc">price:desc</option>
                <option value="rating:asc">rating:asc</option>
                <option value="rating:desc">rating:desc</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>

            <button
              type="button"
              onClick={onApply}
              className="flex h-10 w-full max-w-[120px] items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-semibold text-white"
            >
              Filtrele
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1048px]">
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0]" />
            </div>
          ) : null}

          {!isLoading && productList.length === 0 ? (
            <div className="flex w-full items-center justify-center py-16 text-sm font-semibold text-[#737373]">
              Ürün bulunamadı
            </div>
          ) : null}

          {!isLoading ? (
            <div className="grid w-full grid-cols-1 justify-items-center gap-[30px] sm:grid-cols-2 sm:justify-items-stretch sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
              {productList.map((p) => {
                const id = pickProductId(p);
                const title = pickTitle(p);
                const dept = pickDept(p);
                const img = pickImage(p);
                const price = formatMoney(pickPriceOld(p));
                const sale = formatMoney(pickSale(p));
                const url = buildProductUrl(p);
                const liked = id != null && likedIds.includes(String(id));

                return (
                  <div key={id ?? title} className="group relative w-[348px] sm:w-full">
                    <button
                      type="button"
                      onClick={() => (url ? navigate(url) : null)}
                      className="w-full cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
                      aria-label={`Open product ${id ?? title}`}
                    >
                      <div className="sm:hidden">
                        <MobileProductCard img={img} title={title} dept={dept} price={price} sale={sale} />
                      </div>

                      <div className="hidden sm:block">
                        <ProductCard img={img} title={title} dept={dept} price={price} sale={sale} />
                      </div>
                    </button>

                    <div className="pointer-events-none absolute inset-x-0 bottom-3 hidden px-3 sm:block">
                      <div className="pointer-events-auto flex gap-2 opacity-0 transition-all group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => onQuickAdd(e, p)}
                          className="flex h-10 flex-1 items-center justify-center gap-2 rounded bg-[#252B42] text-sm font-bold text-white"
                          aria-label="Hızlı sepete ekle"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Hızlı Sepete Ekle
                        </button>

                        <button
                          type="button"
                          onClick={(e) => (id != null ? onLike(e, id) : null)}
                          className={`flex h-10 w-10 items-center justify-center rounded border ${
                            liked ? "border-[#23A6F0] bg-[#23A6F0] text-white" : "border-[#E6E6E6] bg-white text-[#252B42]"
                          }`}
                          aria-label="Like"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex w-full items-center justify-center">
          <div className="flex h-[74px] w-[313px] overflow-hidden rounded border border-[#E6E6E6] bg-white">
            <button
              type="button"
              onClick={() => onPage(1)}
              className="flex h-full flex-1 items-center justify-center bg-[#F3F3F3] text-sm font-bold text-[#BDBDBD]"
              disabled={currentPage === 1}
            >
              First
            </button>

            {pageButtons.map((pnum) => (
              <button
                key={pnum}
                type="button"
                onClick={() => onPage(pnum)}
                className={`flex h-full w-[46px] items-center justify-center text-sm font-bold ${
                  currentPage === pnum ? "bg-[#23A6F0] text-white" : "bg-white text-[#23A6F0]"
                }`}
              >
                {pnum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onPage(Math.min(totalPages, currentPage + 1))}
              className="flex h-full flex-1 items-center justify-center bg-white text-sm font-bold text-[#23A6F0]"
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Container>

      <div className="w-full bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[1050px] flex-col items-center justify-center gap-14 px-4 py-16 md:h-[175px] md:flex-row md:justify-between md:gap-0 md:px-0 md:py-0">
          {brands.map((b, i) => (
            <button key={i} type="button" onClick={() => navigate("/")} className="inline-flex">
              <img src={b} alt="brand" className="h-10 w-auto opacity-60" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

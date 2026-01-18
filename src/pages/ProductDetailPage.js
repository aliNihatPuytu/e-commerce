import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Container from "../layout/Container";
import { fetchProductById, initLikes, slugifyTr, toggleLike } from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";

function pickId(p) {
  return p?.id ?? p?.product_id ?? p?.productId;
}

function pickTitle(p) {
  return String(p?.name || p?.title || p?.product_name || p?.productName || "Product");
}

function pickPrice(p) {
  const n = Number(p?.price);
  return Number.isFinite(n) ? n : 0;
}

function pickImages(p) {
  const arr = Array.isArray(p?.images) ? p.images : [];
  const urls = arr.map((x) => (typeof x === "string" ? x : x?.url)).filter(Boolean);
  const fallback =
    p?.img || p?.image || p?.thumbnail || p?.thumbnailUrl || p?.thumbnail_url || "";
  const list = urls.length ? urls : fallback ? [fallback] : [];
  return list;
}

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const productId = params.productId || params.id;

  const product = useSelector((s) => s?.product?.activeProduct);
  const fetchState = useSelector((s) => s?.product?.activeFetchState) || "NOT_FETCHED";
  const likedIds = useSelector((s) => s?.product?.likedIds) || [];

  useEffect(() => {
    dispatch(initLikes());
  }, [dispatch]);

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const images = useMemo(() => (product ? pickImages(product) : []), [product]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [productId]);

  const canSlide = images.length > 1;

  const goPrev = () => {
    if (!canSlide) return;
    setActiveIndex((p) => (p - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!canSlide) return;
    setActiveIndex((p) => (p + 1) % images.length);
  };

  const isLoading = fetchState === "FETCHING";
  const isFailed = fetchState === "FAILED";

  const pid = product ? pickId(product) : null;
  const liked = pid != null && likedIds.includes(String(pid));

  const onAdd = () => {
    if (!product) return;
    dispatch(addToCart(product));
    window.dispatchEvent(new Event("cart:open"));
  };

  const onLike = () => {
    if (pid == null) return;
    dispatch(toggleLike(pid));
  };

  const backToCategory = () => {
    const { gender, categoryName, categoryId } = params;
    if (gender && categoryName && categoryId) {
      navigate(`/shop/${gender}/${categoryName}/${categoryId}`);
      return;
    }
    navigate(-1);
  };

  return (
    <div className="w-full bg-white">
      <Container className="py-10">
        <button
          type="button"
          onClick={backToCategory}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#23A6F0]"
        >
          <ChevronLeft className="h-4 w-4" />
          Geri
        </button>

        {isLoading ? (
          <div className="flex w-full items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0]" />
          </div>
        ) : null}

        {isFailed ? (
          <div className="py-16 text-center text-sm font-semibold text-[#737373]">Ürün bulunamadı</div>
        ) : null}

        {!isLoading && !isFailed && product ? (
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="w-full">
              <div className="relative h-[340px] w-full overflow-hidden rounded bg-[#F6F6F6] sm:h-[450px]">
                {images[activeIndex] ? (
                  <img src={images[activeIndex]} alt={pickTitle(product)} className="h-full w-full object-cover" />
                ) : null}

                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-2 text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-black/30 p-2 text-white disabled:opacity-30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {images.length ? (
                <div className="mt-4 flex gap-3">
                  {images.slice(0, 4).map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`h-20 w-24 overflow-hidden rounded border ${
                        i === activeIndex ? "border-[#23A6F0]" : "border-transparent"
                      } bg-[#F6F6F6]`}
                    >
                      <img src={src} alt={`${pickTitle(product)} ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex w-full flex-col">
              <h1 className="text-2xl font-bold text-[#252B42]">{pickTitle(product)}</h1>

              <div className="mt-3 text-sm font-bold text-[#737373]">
                Rating: <span className="text-[#252B42]">{Number(product?.rating || 0).toFixed(2)}</span>
              </div>

              <div className="mt-4 text-2xl font-bold text-[#252B42]">{fmt(pickPrice(product))}</div>

              <div className="mt-3 text-sm font-bold text-[#737373]">
                Stock: <span className="text-[#23A6F0]">{Number(product?.stock || 0)}</span>
              </div>

              <p className="mt-6 text-sm leading-6 text-[#737373]">{String(product?.description || "")}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onAdd}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#23A6F0] px-6 text-sm font-bold text-white"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Sepete Ekle
                </button>

                <button
                  type="button"
                  onClick={onLike}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded border ${
                    liked ? "border-[#23A6F0] bg-[#23A6F0] text-white" : "border-[#E6E6E6] bg-white text-[#252B42]"
                  }`}
                  aria-label="Like"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-10 text-xs font-bold text-[#BDBDBD]">
                URL slug: {slugifyTr(pickTitle(product))}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

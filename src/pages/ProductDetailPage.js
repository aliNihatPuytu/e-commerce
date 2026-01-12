import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS_BY_ID, SHOP_PRODUCTS } from "../data/products";

import contentImg from "../assets/images/shop-page/product-1.png";

import brand1 from "../assets/images/home-page/brand-1.png";
import brand2 from "../assets/images/home-page/brand-2.png";
import brand3 from "../assets/images/home-page/brand-3.png";
import brand4 from "../assets/images/home-page/brand-4.png";
import brand5 from "../assets/images/home-page/brand-5.png";
import brand6 from "../assets/images/home-page/brand-6.png";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS_BY_ID?.[id] || SHOP_PRODUCTS.find((p) => String(p.id) === String(id));

  const related = useMemo(() => {
    const list = SHOP_PRODUCTS.filter((p) => String(p.id) !== String(id));
    return list.slice(0, 8);
  }, [id]);

  const gallery = useMemo(() => {
    const main = product?.img;
    const alt =
      SHOP_PRODUCTS.find((p) => p?.img && p.img !== main)?.img ||
      SHOP_PRODUCTS.find((p) => p?.img)?.img ||
      main;

    const arr = [main, alt].filter(Boolean);
    return arr.length ? arr : [];
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    setActiveIndex(0);
    setActiveTab("desc");
  }, [id]);

  const canSlide = gallery.length > 1;

  const goPrev = () => {
    if (!canSlide) return;
    setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length);
  };

  const goNext = () => {
    if (!canSlide) return;
    setActiveIndex((p) => (p + 1) % gallery.length);
  };

  const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-[1050px] px-4 py-16 text-center text-[#252B42]">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto flex w-full max-w-[1050px] items-center gap-2 px-4 py-4 text-sm font-bold text-[#737373] md:px-0">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
            <span>Shop</span>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto grid w-full max-w-[1050px] grid-cols-2 gap-8 px-4 py-10 md:px-0">
            <div className="w-full">
              <div className="relative h-[450px] w-full overflow-hidden rounded-[5px] bg-white">
                <img
                  src={gallery[activeIndex] || product.img}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canSlide}
                  className="absolute left-10 top-1/2 -translate-y-1/2 disabled:opacity-30"
                >
                  <ChevronLeft className="h-11 w-11 text-white" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 disabled:opacity-30"
                >
                  <ChevronRight className="h-11 w-11 text-white" />
                </button>
              </div>

              <div className="mt-5 flex gap-5">
                {gallery.slice(0, 2).map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-[75px] w-[100px] overflow-hidden rounded-[5px] border ${
                      i === activeIndex ? "border-[#23A6F0]" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt={`${product.title} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col pt-2 text-[#252B42]">
              <h1 className="text-2xl font-bold">{product.title}</h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#F3CD03]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-sm font-bold text-[#737373]">10 Reviews</span>
              </div>

              <div className="mt-4 text-2xl font-bold">{product.price}</div>

              <div className="mt-3 text-sm font-bold text-[#737373]">
                Availability : <span className="text-[#23A6F0]">In Stock</span>
              </div>

              <p className="mt-6 max-w-[330px] text-sm leading-5 text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                ENIM RELIT Mollie. Excitation venial consequent nostrum met.
              </p>

              <div className="mt-6 h-px w-full bg-[#BDBDBD]/30" />

              <div className="mt-6 flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[#23A6F0]" />
                <span className="h-4 w-4 rounded-full bg-[#2DC071]" />
                <span className="h-4 w-4 rounded-full bg-[#E77C40]" />
                <span className="h-4 w-4 rounded-full bg-[#252B42]" />
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  className="h-11 rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold text-white"
                >
                  Select Options
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                >
                  <Heart className="h-5 w-5 text-[#252B42]" />
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                >
                  <ShoppingCart className="h-5 w-5 text-[#252B42]" />
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                >
                  <Eye className="h-5 w-5 text-[#252B42]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-t border-[#ECECEC] bg-white">
          <div className="mx-auto flex w-full max-w-[1050px] items-center justify-center gap-6 px-4 py-6 text-sm font-bold md:px-0">
            <button
              type="button"
              onClick={() => setActiveTab("desc")}
              className={activeTab === "desc" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={activeTab === "add" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rev")}
              className={activeTab === "rev" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Reviews <span className="text-[#23856D]">(0)</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="mx-auto grid w-full max-w-[1050px] grid-cols-3 gap-10 px-4 py-16 md:px-0">
            <div className="overflow-hidden rounded-[5px]">
              <img src={contentImg} alt="content" className="h-[372px] w-full object-cover" />
            </div>

            <div className="text-[#252B42]">
              <h3 className="text-xl font-bold">the quick fox jumps over</h3>
              <p className="mt-6 text-sm leading-6 text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                ENIM RELIT Mollie. Excitation venial consequent nostrum met.
              </p>
              <p className="mt-6 text-sm leading-6 text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                ENIM RELIT Mollie. Excitation venial consequent nostrum met.
              </p>
              <p className="mt-6 text-sm leading-6 text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                ENIM RELIT Mollie. Excitation venial consequent nostrum met.
              </p>
            </div>

            <div className="text-[#252B42]">
              <h3 className="text-xl font-bold">the quick fox jumps over</h3>

              <ul className="mt-6 space-y-3 text-sm font-bold text-[#737373]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
                    the quick fox jumps over the lazy dog
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-xl font-bold">the quick fox jumps over</h3>
              <ul className="mt-6 space-y-3 text-sm font-bold text-[#737373]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
                    the quick fox jumps over the lazy dog
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[1050px] px-4 py-16 md:px-0">
            <h2 className="text-2xl font-bold text-[#252B42]">BESTSELLER PRODUCTS</h2>

            <div className="mt-10 grid grid-cols-4 gap-8">
              {related.map((p) => (
                <button key={p.id} type="button" onClick={() => navigate(`/product/${p.id}`)} className="text-left">
                  <ProductCard
                    img={p.img}
                    title={p.title}
                    dept={p.department || "English Department"}
                    oldPrice={p.oldPrice}
                    price={p.price}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[1050px] px-4 py-16 md:flex md:h-[175px] md:items-center md:px-0 md:py-0">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 md:w-full md:justify-between md:gap-0">
              {brands.map((src, i) => (
                <img key={src + i} src={src} alt={`brand-${i}`} className="h-10 opacity-60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[414px] py-6">
            <div className="mx-auto flex w-[348px] items-center gap-2 text-sm font-bold text-[#737373]">
              <span>Home</span>
              <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
              <span>Shop</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[414px] py-12">
            <div className="mx-auto flex w-[348px] flex-col gap-[30px]">
              <div className="w-full">
                <div className="relative h-[277px] w-[348px] overflow-hidden rounded-[5px] bg-white">
                  <img
                    src={gallery[activeIndex] || product.img}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={!canSlide}
                    className="absolute left-10 top-1/2 -translate-y-1/2 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-11 w-11 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 disabled:opacity-30"
                  >
                    <ChevronRight className="h-11 w-11 text-white" />
                  </button>
                </div>

                <div className="mt-5 flex gap-5">
                  {gallery.slice(0, 2).map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`h-[75px] w-[100px] overflow-hidden rounded-[5px] border ${
                        i === activeIndex ? "border-[#23A6F0]" : "border-transparent"
                      }`}
                    >
                      <img src={src} alt={`${product.title} ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full text-[#252B42]">
                <h1 className="text-xl font-bold">{product.title}</h1>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#F3CD03]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#737373]">10 Reviews</span>
                </div>

                <div className="mt-4 text-2xl font-bold">{product.price}</div>

                <div className="mt-3 text-sm font-bold text-[#737373]">
                  Availability : <span className="text-[#23A6F0]">In Stock</span>
                </div>

                <p className="mt-6 text-sm leading-5 text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                  ENIM RELIT Mollie. Excitation venial consequent nostrum met.
                </p>

                <div className="mt-6 h-px w-full bg-[#BDBDBD]/30" />

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-[#23A6F0]" />
                  <span className="h-4 w-4 rounded-full bg-[#2DC071]" />
                  <span className="h-4 w-4 rounded-full bg-[#E77C40]" />
                  <span className="h-4 w-4 rounded-full bg-[#252B42]" />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button type="button" className="h-11 rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold text-white">
                    Select Options
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                  >
                    <Heart className="h-5 w-5 text-[#252B42]" />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                  >
                    <ShoppingCart className="h-5 w-5 text-[#252B42]" />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
                  >
                    <Eye className="h-5 w-5 text-[#252B42]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="mx-auto w-full max-w-[414px] py-6">
            <div className="mx-auto flex w-[332px] items-center justify-center gap-6 text-sm font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("desc")}
                className={activeTab === "desc" ? "text-[#23856D]" : "text-[#737373]"}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("add")}
                className={activeTab === "add" ? "text-[#23856D]" : "text-[#737373]"}
              >
                Additional Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("rev")}
                className={activeTab === "rev" ? "text-[#23856D]" : "text-[#737373]"}
              >
                Reviews <span className="text-[#23856D]">(0)</span>
              </button>
            </div>

            <div className="mx-auto mt-10 flex w-[332px] flex-col gap-[30px] pb-20">
              <div className="relative h-[292px] w-full overflow-hidden rounded-[9px] bg-[#C4C4C4]/20">
                <img src={contentImg} alt="content" className="h-full w-full object-cover" />
              </div>

              <div className="w-full text-[#252B42]">
                <h3 className="text-xl font-bold">the quick fox jumps over</h3>
                <p className="mt-6 text-sm leading-6 text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                  ENIM RELIT Mollie. Excitation venial consequent nostrum met.
                </p>
                <p className="mt-6 text-sm leading-6 text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                  ENIM RELIT Mollie. Excitation venial consequent nostrum met.
                </p>
                <p className="mt-6 text-sm leading-6 text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door
                  ENIM RELIT Mollie. Excitation venial consequent nostrum met.
                </p>
              </div>

              <div className="w-full text-[#252B42]">
                <h3 className="text-xl font-bold">the quick fox jumps over</h3>
                <ul className="mt-6 space-y-3 text-sm font-bold text-[#737373]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
                      the quick fox jumps over the lazy dog
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 text-xl font-bold">the quick fox jumps over</h3>
                <ul className="mt-6 space-y-3 text-sm font-bold text-[#737373]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
                      the quick fox jumps over the lazy dog
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[414px] py-12">
            <div className="mx-auto flex w-[331px] flex-col items-center gap-6">
              <h2 className="w-full text-left text-2xl font-bold text-[#252B42]">BESTSELLER PRODUCTS</h2>

              <div className="grid w-full grid-cols-1 gap-6">
                {related.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="text-left"
                  >
                    <ProductCard
                      img={p.img}
                      title={p.title}
                      dept={p.department || "English Department"}
                      oldPrice={p.oldPrice}
                      price={p.price}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[414px] py-6">
            <div className="mx-auto flex w-[352px] flex-col items-center gap-6">
              {brands.map((src, i) => (
                <img key={src + i} src={src} alt={`brand-${i}`} className="h-10 opacity-60" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

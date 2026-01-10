import { LayoutGrid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";

import c1 from "../assets/images/shop-page/cloths-1.png";
import c2 from "../assets/images/shop-page/cloths-2.png";
import c3 from "../assets/images/shop-page/cloths-3.png";
import c4 from "../assets/images/shop-page/cloths-4.png";
import c5 from "../assets/images/shop-page/cloths-5.png";

import p1 from "../assets/images/shop-page/product-1.png";
import p2 from "../assets/images/shop-page/product-2.png";
import p3 from "../assets/images/shop-page/product-3.png";
import p4 from "../assets/images/shop-page/product-4.png";
import p5 from "../assets/images/shop-page/product-5.png";
import p6 from "../assets/images/shop-page/product-6.png";
import p7 from "../assets/images/shop-page/product-7.png";
import p8 from "../assets/images/shop-page/product-8.png";
import p9 from "../assets/images/shop-page/product-9.png";
import p10 from "../assets/images/shop-page/product-10.png";
import p11 from "../assets/images/shop-page/product-11.png";
import p12 from "../assets/images/shop-page/product-12.png";

import brand1 from "../assets/images/shop-page/brand-1.png";
import brand2 from "../assets/images/shop-page/brand-2.png";
import brand3 from "../assets/images/shop-page/brand-3.png";
import brand4 from "../assets/images/shop-page/brand-4.png";
import brand5 from "../assets/images/shop-page/brand-5.png";

export default function ShopPage() {
  const categories = [
    { id: 1, title: "CLOTHS", items: "5 Items", image: c1 },
    { id: 2, title: "CLOTHS", items: "5 Items", image: c2 },
    { id: 3, title: "CLOTHS", items: "5 Items", image: c3 },
    { id: 4, title: "CLOTHS", items: "5 Items", image: c4 },
    { id: 5, title: "CLOTHS", items: "5 Items", image: c5 },
  ];

  const products = [
    p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12,
  ].map((image, idx) => ({ id: idx + 1, image }));

  const brands = [brand1, brand2, brand3, brand4, brand5];

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="flex w-full max-w-262.5 flex-col px-4 pb-10 pt-8">
        <div className="flex w-full items-center justify-between">
          <div className="text-2xl font-bold text-[#252B42]">Shop</div>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm font-bold text-[#252B42]">Home</span>
            <span className="text-sm font-bold text-[#BDBDBD]">{">"}</span>
            <span className="text-sm font-bold text-[#BDBDBD]">Shop</span>
          </div>
        </div>

        <div className="flex w-full flex-wrap -mx-2 pt-8">
          {categories.map((c) => (
            <div key={c.id} className="flex w-full px-2 pb-4 lg:w-1/5 lg:pb-0">
              <div className="relative flex h-56 w-full overflow-hidden">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                  <div className="text-base font-bold text-white">{c.title}</div>
                  <div className="text-sm font-normal text-white">{c.items}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-6 pt-6 lg:flex-row lg:items-center lg:justify-between lg:pt-10">
          <div className="text-sm font-semibold text-[#737373]">Showing all 12 results</div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-sm font-semibold text-[#737373]">Views:</div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4 text-[#252B42]" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="List view"
            >
              <List className="h-4 w-4 text-[#737373]" />
            </button>
          </div>

          <div className="flex w-full items-center gap-3 lg:w-auto">
            <select className="flex h-10 w-full items-center rounded border border-[#E6E6E6] bg-[#F9F9F9] px-4 text-sm text-[#737373] outline-none lg:w-48">
              <option>Popularity</option>
            </select>
            <button
              type="button"
              className="flex h-10 items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-semibold text-white"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="flex w-full flex-wrap -mx-3 pt-10">
          {products.map((p) => (
            <div key={p.id} className="flex w-full px-3 pb-10 sm:w-1/2 lg:w-1/4">
              <ProductCard image={p.image} title="Graphic Design" department="English Department" />
            </div>
          ))}
        </div>

        <div className="flex w-full items-center justify-center pt-6">
          <div className="flex overflow-hidden rounded border border-[#E6E6E6]">
            <button
              type="button"
              className="flex h-12 items-center justify-center bg-[#F3F3F3] px-5 text-sm font-bold text-[#BDBDBD]"
            >
              First
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center bg-white text-sm font-bold text-[#23A6F0]"
            >
              1
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center bg-[#23A6F0] text-sm font-bold text-white"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center bg-white text-sm font-bold text-[#23A6F0]"
            >
              3
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center bg-white px-5 text-sm font-bold text-[#23A6F0]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-white pb-10 pt-6">
        <div className="flex w-full max-w-262.5 items-center justify-between px-4">
          {brands.map((b, i) => (
            <img key={i} src={b} alt="brand" className="h-10 w-auto opacity-40 grayscale" />
          ))}
        </div>
      </div>
    </div>
  );
}

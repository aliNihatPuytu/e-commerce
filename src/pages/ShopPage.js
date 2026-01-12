import { SHOP_PRODUCTS } from "../data/products";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, List, ChevronRight, ChevronDown } from "lucide-react";
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

const Dot = ({ className }) => <span className={`h-2.5 w-2.5 rounded-full ${className}`} />;

function MobileProductCard({ img, title, dept, price, sale }) {
  return (
    <div className="flex h-[615px] w-[348px] flex-col items-center bg-white">
      <div className="h-[427px] w-full bg-[#F6F6F6]">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </div>

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

export default function ShopPage() {
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      { id: 1, title: "CLOTHS", items: "5 Items", image: c1 },
      { id: 2, title: "CLOTHS", items: "5 Items", image: c2 },
      { id: 3, title: "CLOTHS", items: "5 Items", image: c3 },
      { id: 4, title: "CLOTHS", items: "5 Items", image: c4 },
      { id: 5, title: "CLOTHS", items: "5 Items", image: c5 },
    ],
    []
  );

  const products = useMemo(() => SHOP_PRODUCTS, []);
  const brands = useMemo(() => [brand1, brand2, brand3, brand4, brand5, brand6], []);

  const [view, setView] = useState("grid");
  const [page, setPage] = useState(2);
  const [sort, setSort] = useState("Popularity");

  const buildUrl = (next = {}) => {
    const sp = new URLSearchParams();
    sp.set("view", next.view ?? view);
    sp.set("page", String(next.page ?? page));
    sp.set("sort", next.sort ?? sort);
    return `/shop?${sp.toString()}`;
  };

  const handleCategoryClick = (c) => {
    const sp = new URLSearchParams();
    sp.set("category", String(c.id));
    sp.set("view", view);
    sp.set("page", String(page));
    sp.set("sort", sort);
    navigate(`/shop?${sp.toString()}`);
  };

  const handleView = (nextView) => {
    setView(nextView);
    navigate(buildUrl({ view: nextView }));
  };

  const handlePage = (nextPage) => {
    setPage(nextPage);
    navigate(buildUrl({ page: nextPage }));
  };

  const handleFilter = () => {
    navigate(buildUrl());
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
          {categories.map((c) => (
            <ShopCategoryCard
              key={c.id}
              image={c.image}
              title={c.title}
              items={c.items}
              className="h-[300px] sm:h-[223px]"
              onClick={() => handleCategoryClick(c)}
            />
          ))}
        </div>
      </div>

      <Container className="flex flex-col pb-12">
        <div className="mt-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center">
          <div className="text-center text-sm font-semibold text-[#737373] lg:text-left">
            Showing all 12 results
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-center lg:gap-4">
            <div className="text-sm font-semibold text-[#737373]">Views:</div>

            <button
              type="button"
              onClick={() => handleView("grid")}
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="Grid view"
            >
              <LayoutGrid
                className={`h-4 w-4 ${view === "grid" ? "text-[#252B42]" : "text-[#737373]"}`}
              />
            </button>

            <button
              type="button"
              onClick={() => handleView("list")}
              className="flex h-10 w-10 items-center justify-center rounded border border-[#E6E6E6] bg-white"
              aria-label="List view"
            >
              <List
                className={`h-4 w-4 ${view === "list" ? "text-[#252B42]" : "text-[#737373]"}`}
              />
            </button>
          </div>

          <div className="flex w-full items-center justify-center gap-3 lg:justify-end">
            <div className="relative w-full max-w-[160px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 w-full appearance-none rounded border border-[#E6E6E6] bg-[#F9F9F9] px-4 pr-10 text-sm text-[#737373] outline-none"
              >
                <option>Popularity</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>

            <button
              type="button"
              onClick={handleFilter}
              className="flex h-10 items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-semibold text-white"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1048px]">
          <div className="grid w-full grid-cols-1 justify-items-center gap-[30px] sm:grid-cols-2 sm:justify-items-stretch sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
            {products.map((p) => (
              <div key={p.id} className="w-[348px] sm:w-full">
                <button
                  type="button"
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="w-full"
                  aria-label={`Open product ${p.id}`}
                >
                  <div className="sm:hidden">
                    <MobileProductCard
                      img={p.img}
                      title={p.title}
                      dept={p.department}
                      price={p.price}
                      sale={p.sale}
                    />
                  </div>

                  <div className="hidden sm:block">
                    <ProductCard
                      img={p.img}
                      title={p.title}
                      dept={p.department}
                      price={p.price}
                      sale={p.sale}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex w-full items-center justify-center">
          <div className="flex h-[74px] w-[313px] overflow-hidden rounded border border-[#E6E6E6] bg-white">
            <button
              type="button"
              onClick={() => handlePage(1)}
              className="flex h-full flex-1 items-center justify-center bg-[#F3F3F3] text-sm font-bold text-[#BDBDBD]"
            >
              First
            </button>

            <button
              type="button"
              onClick={() => handlePage(1)}
              className={`flex h-full w-[46px] items-center justify-center text-sm font-bold ${
                page === 1 ? "bg-[#23A6F0] text-white" : "bg-white text-[#23A6F0]"
              }`}
            >
              1
            </button>

            <button
              type="button"
              onClick={() => handlePage(2)}
              className={`flex h-full w-[46px] items-center justify-center text-sm font-bold ${
                page === 2 ? "bg-[#23A6F0] text-white" : "bg-white text-[#23A6F0]"
              }`}
            >
              2
            </button>

            <button
              type="button"
              onClick={() => handlePage(3)}
              className={`flex h-full w-[46px] items-center justify-center text-sm font-bold ${
                page === 3 ? "bg-[#23A6F0] text-white" : "bg-white text-[#23A6F0]"
              }`}
            >
              3
            </button>

            <button
              type="button"
              onClick={() => handlePage(Math.min(3, page + 1))}
              className="flex h-full flex-1 items-center justify-center bg-white text-sm font-bold text-[#23A6F0]"
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

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import {
  removeFromCart,
  setCartItemCount,
  toggleCartItemChecked,
  setAllCartChecked,
} from "../store/actions/shoppingCartActions";

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
  const v = p?.price;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((s) => s?.shoppingCart?.cart) || [];

  const { allChecked, selectedSubtotal, totalCount, hasSelected, shipping, discount, grandTotal } = useMemo(() => {
    const allChecked = cart.length > 0 && cart.every((x) => !!x.checked);
    const selectedSubtotal = cart
      .filter((x) => x.checked)
      .reduce((sum, x) => sum + pickPriceNumber(x.product) * (Number(x.count) || 0), 0);

    const totalCount = cart.reduce((sum, x) => sum + (Number(x.count) || 0), 0);
    const hasSelected = cart.some((x) => !!x.checked);

    const discount = 0;
    const shipping = hasSelected ? (selectedSubtotal >= 100 ? 0 : 29.99) : 0;
    const grandTotal = Math.max(0, selectedSubtotal + shipping - discount);

    return { allChecked, selectedSubtotal, totalCount, hasSelected, shipping, discount, grandTotal };
  }, [cart]);

  return (
    <div className="w-full bg-white">
      <Container className="py-10">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#252B42]">Sepet</div>
          <div className="text-sm font-bold text-[#737373]">Toplam ürün adedi: {totalCount}</div>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-10 text-center">
            <div className="text-sm font-semibold text-[#737373]">Sepetiniz boş</div>
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-6 inline-flex h-10 items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-bold text-white"
            >
              Alışverişe Devam Et
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="w-full overflow-hidden rounded border border-[#E6E6E6]">
                <div className="grid grid-cols-12 gap-0 bg-[#FAFAFA] px-4 py-3 text-sm font-bold text-[#252B42]">
                  <div className="col-span-6 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={(e) => dispatch(setAllCartChecked(e.target.checked))}
                      className="h-4 w-4 accent-[#23A6F0]"
                    />
                    <span>Ürün</span>
                  </div>
                  <div className="col-span-2">Fiyat</div>
                  <div className="col-span-2">Adet</div>
                  <div className="col-span-2 text-right">Ara Toplam</div>
                </div>

                {cart.map((row) => {
                  const p = row.product;
                  const id = pickId(p);
                  const title = pickTitle(p);
                  const img = pickImage(p);
                  const price = pickPriceNumber(p);
                  const count = Number(row.count) || 1;
                  const lineTotal = price * count;

                  return (
                    <div
                      key={String(id)}
                      className="grid grid-cols-12 items-center gap-0 border-t border-[#E6E6E6] px-4 py-4"
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={!!row.checked}
                          onChange={() => dispatch(toggleCartItemChecked(id))}
                          className="h-4 w-4 accent-[#23A6F0]"
                        />

                        <button
                          type="button"
                          onClick={() => navigate(`/product/${id}`)}
                          className="flex items-center gap-3 text-left"
                        >
                          <div className="h-16 w-16 overflow-hidden rounded bg-[#F6F6F6]">
                            {img ? <img src={img} alt={title} className="h-full w-full object-cover" /> : null}
                          </div>

                          <div className="flex flex-col">
                            <div className="text-sm font-bold text-[#252B42]">{title}</div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeFromCart(id));
                              }}
                              className="mt-1 w-fit text-xs font-bold text-[#23A6F0]"
                            >
                              Kaldır
                            </button>
                          </div>
                        </button>
                      </div>

                      <div className="col-span-2 text-sm font-bold text-[#252B42]">{fmt(price)}</div>

                      <div className="col-span-2">
                        <div className="inline-flex h-9 items-center overflow-hidden rounded border border-[#E6E6E6] bg-white">
                          <button
                            type="button"
                            onClick={() => dispatch(setCartItemCount(id, Math.max(1, count - 1)))}
                            className="h-9 w-9 text-sm font-bold text-[#252B42]"
                          >
                            -
                          </button>
                          <div className="flex h-9 w-10 items-center justify-center text-sm font-bold text-[#252B42]">
                            {count}
                          </div>
                          <button
                            type="button"
                            onClick={() => dispatch(setCartItemCount(id, count + 1))}
                            className="h-9 w-9 text-sm font-bold text-[#252B42]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-right text-sm font-bold text-[#252B42]">{fmt(lineTotal)}</div>
                    </div>
                  );
                })}

                <div className="border-t border-[#E6E6E6] bg-white px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-[#737373]">Seçili ürünler toplamı</div>
                    <div className="text-lg font-bold text-[#252B42]">{fmt(selectedSubtotal)}</div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/shop")}
                      className="inline-flex h-11 items-center justify-center rounded border border-[#23A6F0] bg-white px-6 text-sm font-bold text-[#23A6F0]"
                    >
                      Alışverişe Devam Et
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded border border-[#E6E6E6] bg-white p-5">
                <div className="text-base font-bold text-[#252B42]">Order Summary</div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-bold text-[#737373]">Products Total</div>
                    <div className="font-bold text-[#252B42]">{fmt(selectedSubtotal)}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="font-bold text-[#737373]">Shipping</div>
                    <div className="font-bold text-[#252B42]">{fmt(shipping)}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="font-bold text-[#737373]">Discount</div>
                    <div className="font-bold text-[#252B42]">{fmt(discount)}</div>
                  </div>

                  <div className="h-px w-full bg-[#E6E6E6]" />

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-[#252B42]">Grand Total</div>
                    <div className="text-xl font-bold text-[#252B42]">{fmt(grandTotal)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!hasSelected}
                  onClick={() => navigate("/checkout")}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded bg-[#23A6F0] text-sm font-bold text-white disabled:opacity-50"
                >
                  Create Order
                </button>

                {!hasSelected ? (
                  <div className="mt-3 text-xs font-bold text-[#737373]">Devam etmek için sepetten ürün seçmelisiniz.</div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

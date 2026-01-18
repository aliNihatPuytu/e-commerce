import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Container from "../layout/Container";
import client from "../api/client";
import { isAuthed } from "../auth/auth";

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function normalizeOrders(data) {
  if (Array.isArray(data)) return data;
  const list = data?.orders || data?.data || data?.result || [];
  return Array.isArray(list) ? list : [];
}

function normalizeProducts(data) {
  const list = data?.products || data?.items || data?.order_products || [];
  return Array.isArray(list) ? list : [];
}

export default function OrdersPage() {
  const location = useLocation();
  const authed = isAuthed();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!authed) return;

    let active = true;
    setLoading(true);

    client
      .get("/order")
      .then((res) => {
        if (!active) return;
        setOrders(normalizeOrders(res.data));
      })
      .catch(() => {
        if (!active) return;
        setOrders([]);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authed]);

  if (!authed) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  const rows = useMemo(() => {
    return (orders || []).map((o) => {
      const id = o?.id ?? o?.order_id ?? o?.orderId ?? "";
      const date = o?.order_date || o?.created_at || o?.createdAt || "";
      const price = o?.price ?? o?.total_price ?? o?.total ?? 0;
      const products = normalizeProducts(o);
      const count = products.reduce((sum, p) => sum + (Number(p?.count) || 0), 0);
      return { raw: o, id, date, price, products, count };
    });
  }, [orders]);

  return (
    <div className="w-full bg-white">
      <Container className="py-10">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#252B42]">Previous Orders</div>
          <div className="text-sm font-bold text-[#737373]">{rows.length} order</div>
        </div>

        {loading ? (
          <div className="mt-6 text-sm font-bold text-[#737373]">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="mt-10 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-10 text-center">
            <div className="text-sm font-bold text-[#737373]">Henüz sipariş yok.</div>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded border border-[#E6E6E6]">
            <div className="grid grid-cols-12 bg-[#FAFAFA] px-4 py-3 text-sm font-bold text-[#252B42]">
              <div className="col-span-3">Order</div>
              <div className="col-span-4">Date</div>
              <div className="col-span-2">Items</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1 text-right">Detail</div>
            </div>

            {rows.map((r) => (
              <div key={String(r.id)} className="border-t border-[#E6E6E6] bg-white px-4 py-4">
                <div className="grid grid-cols-12 items-center text-sm font-bold">
                  <div className="col-span-3 text-[#252B42]">#{String(r.id)}</div>
                  <div className="col-span-4 text-[#737373]">{String(r.date || "-")}</div>
                  <div className="col-span-2 text-[#252B42]">{r.count}</div>
                  <div className="col-span-2 text-[#252B42]">{fmt(r.price)}</div>

                  <div className="col-span-1 flex justify-end">
                    <details className="group">
                      <summary className="cursor-pointer select-none text-xs font-bold text-[#23A6F0]">
                        View
                      </summary>

                      <div className="mt-3 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                        <div className="text-sm font-bold text-[#252B42]">Order Details</div>

                        <div className="mt-3 space-y-2">
                          {r.products.map((p, idx) => {
                            const pid = p?.product_id ?? p?.productId ?? p?.id ?? idx;
                            const cnt = Number(p?.count) || 0;
                            const detail = String(p?.detail || "-");
                            return (
                              <div key={String(pid)} className="flex items-center justify-between text-xs font-bold">
                                <div className="text-[#737373]">
                                  Product #{String(pid)} x{cnt} · {detail}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

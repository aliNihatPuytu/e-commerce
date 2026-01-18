import { useLocation, useNavigate } from "react-router-dom";
import Container from "../layout/Container";

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location?.state?.orderId ?? null;
  const total = location?.state?.total ?? null;

  return (
    <div className="w-full bg-white">
      <Container className="py-16">
        <div className="mx-auto max-w-[650px] rounded border border-[#E6E6E6] bg-[#FAFAFA] p-10 text-center">
          <div className="text-2xl font-bold text-[#252B42]">Tebrikler</div>
          <div className="mt-3 text-sm font-bold text-[#737373]">Siparişiniz başarıyla oluşturuldu.</div>

          {orderId != null ? (
            <div className="mt-4 text-sm font-bold text-[#252B42]">
              Order No: <span className="text-[#23A6F0]">{String(orderId)}</span>
            </div>
          ) : null}

          {total != null ? (
            <div className="mt-2 text-sm font-bold text-[#252B42]">
              Total: <span className="text-[#23A6F0]">{fmt(total)}</span>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="inline-flex h-11 items-center justify-center rounded bg-[#23A6F0] px-8 text-sm font-bold text-white"
            >
              Previous Orders
            </button>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="inline-flex h-11 items-center justify-center rounded border border-[#23A6F0] bg-white px-8 text-sm font-bold text-[#23A6F0]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

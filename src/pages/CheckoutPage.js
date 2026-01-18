import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import client from "../api/client";
import Container from "../layout/Container";
import { isAuthed } from "../auth/auth";
import { clearCart } from "../store/actions/shoppingCartActions";
import { setAddressList, setCreditCards } from "../store/actions/clientActions";
import { showCenterNotice } from "../utils/centerNotice";

function pickId(p) {
  return p?.id ?? p?.product_id ?? p?.productId;
}

function pickPriceNumber(p) {
  const n = Number(p?.price);
  return Number.isFinite(n) ? n : 0;
}

function pickDetail(p) {
  const parts = [];
  const color = p?.color || p?.colour;
  const size = p?.size;
  if (color) parts.push(String(color));
  if (size) parts.push(String(size));
  const d = parts.join(" - ").trim();
  return d || "standard";
}

function fmt(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function normalizeList(data, fallbackKey) {
  if (Array.isArray(data)) return data;
  const list = data?.[fallbackKey] || data?.data || data?.result || [];
  return Array.isArray(list) ? list : [];
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const authed = isAuthed();
  const cart = useSelector((s) => s?.shoppingCart?.cart) || [];

  const selectedItems = useMemo(() => cart.filter((x) => !!x.checked), [cart]);

  const pricing = useMemo(() => {
    const subtotal = selectedItems.reduce(
      (sum, x) => sum + pickPriceNumber(x.product) * (Number(x.count) || 0),
      0
    );
    const discount = 0;
    const shipping = selectedItems.length ? (subtotal >= 100 ? 0 : 29.99) : 0;
    const total = Math.max(0, subtotal + shipping - discount);
    return { subtotal, shipping, discount, total };
  }, [selectedItems]);

  const [step, setStep] = useState(1);

  const [addrLoading, setAddrLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [placing, setPlacing] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);

  const [shipAddressId, setShipAddressId] = useState("");
  const [billAddressId, setBillAddressId] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
  });

  const [selectedCardId, setSelectedCardId] = useState("");
  const [ccv, setCcv] = useState("");

  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardForm, setCardForm] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });

  useEffect(() => {
    if (!authed) return;
    if (!selectedItems.length) {
      navigate("/cart", { replace: true });
      return;
    }
  }, [authed, selectedItems.length, navigate]);

  useEffect(() => {
    if (!authed) return;
    if (step !== 1) return;

    let active = true;
    setAddrLoading(true);

    client
      .get("/user/address")
      .then((res) => {
        if (!active) return;
        const list = normalizeList(res.data, "addresses");
        setAddresses(list);
        dispatch(setAddressList(list));

        const firstId = list?.[0]?.id;
        if (firstId != null) {
          const fid = String(firstId);
          setShipAddressId((v) => (v ? v : fid));
          setBillAddressId((v) => (v ? v : fid));
        }
      })
      .catch(() => {
        if (!active) return;
        setAddresses([]);
        dispatch(setAddressList([]));
      })
      .finally(() => {
        if (!active) return;
        setAddrLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authed, step, dispatch]);

  useEffect(() => {
    if (!authed) return;
    if (step !== 2) return;

    let active = true;
    setCardLoading(true);

    client
      .get("/user/card")
      .then((res) => {
        if (!active) return;
        const list = normalizeList(res.data, "cards");
        setCards(list);
        dispatch(setCreditCards(list));

        const firstId = list?.[0]?.id;
        if (firstId != null) setSelectedCardId((v) => (v ? v : String(firstId)));
      })
      .catch(() => {
        if (!active) return;
        setCards([]);
        dispatch(setCreditCards([]));
      })
      .finally(() => {
        if (!active) return;
        setCardLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authed, step, dispatch]);

  useEffect(() => {
    if (!sameAsShipping) return;
    setBillAddressId(shipAddressId);
  }, [sameAsShipping, shipAddressId]);

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const canGoStep2 = !!shipAddressId && (!!billAddressId || sameAsShipping);

  const selectedCard = cards.find((c) => String(c?.id) === String(selectedCardId)) || null;

  const canPlaceOrder = useMemo(() => {
    const hasAddr = !!shipAddressId;
    const hasCard = !!selectedCardId;
    const ccvOk = /^\d{3,4}$/.test(String(ccv || "").trim());
    return hasAddr && hasCard && ccvOk && selectedItems.length > 0 && pricing.total > 0 && !placing;
  }, [shipAddressId, selectedCardId, ccv, selectedItems.length, pricing.total, placing]);

  const resetAddressForm = () => {
    setEditingAddressId(null);
    setAddressForm({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });
  };

  const openAddAddress = () => {
    resetAddressForm();
    setAddressFormOpen(true);
  };

  const openEditAddress = (a) => {
    setEditingAddressId(a?.id ?? null);
    setAddressForm({
      title: String(a?.title || ""),
      name: String(a?.name || ""),
      surname: String(a?.surname || ""),
      phone: String(a?.phone || ""),
      city: String(a?.city || ""),
      district: String(a?.district || ""),
      neighborhood: String(a?.neighborhood || ""),
    });
    setAddressFormOpen(true);
  };

  const submitAddress = async () => {
    const payload = {
      title: String(addressForm.title || "").trim(),
      name: String(addressForm.name || "").trim(),
      surname: String(addressForm.surname || "").trim(),
      phone: String(addressForm.phone || "").trim(),
      city: String(addressForm.city || "").trim(),
      district: String(addressForm.district || "").trim(),
      neighborhood: String(addressForm.neighborhood || "").trim(),
    };

    const ok =
      payload.title && payload.name && payload.surname && payload.phone && payload.city && payload.district && payload.neighborhood;

    if (!ok) {
      showCenterNotice({ type: "error", title: "Address", subtitle: "Lütfen tüm alanları doldurun.", duration: 2600 });
      return;
    }

    try {
      const res = editingAddressId
        ? await client.put("/user/address", { id: editingAddressId, ...payload })
        : await client.post("/user/address", payload);

      const list = normalizeList(res.data, "addresses");
      const next = list.length ? list : await client.get("/user/address").then((r) => normalizeList(r.data, "addresses"));

      setAddresses(next);
      dispatch(setAddressList(next));

      if (!shipAddressId && next?.[0]?.id != null) setShipAddressId(String(next[0].id));
      if (!billAddressId && next?.[0]?.id != null) setBillAddressId(String(next[0].id));

      setAddressFormOpen(false);
      resetAddressForm();
      showCenterNotice({ type: "success", title: "Address", subtitle: "Kaydedildi.", duration: 2200 });
    } catch {
      showCenterNotice({ type: "error", title: "Address", subtitle: "Kaydedilemedi.", duration: 2600 });
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await client.delete(`/user/address/${addressId}`);
      const next = addresses.filter((x) => String(x?.id) !== String(addressId));
      setAddresses(next);
      dispatch(setAddressList(next));

      if (String(shipAddressId) === String(addressId)) setShipAddressId(next?.[0]?.id != null ? String(next[0].id) : "");
      if (String(billAddressId) === String(addressId)) setBillAddressId(next?.[0]?.id != null ? String(next[0].id) : "");

      showCenterNotice({ type: "success", title: "Address", subtitle: "Silindi.", duration: 2200 });
    } catch {
      showCenterNotice({ type: "error", title: "Address", subtitle: "Silinemedi.", duration: 2600 });
    }
  };

  const resetCardForm = () => {
    setEditingCardId(null);
    setCardForm({
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    });
  };

  const openAddCard = () => {
    resetCardForm();
    setCardFormOpen(true);
  };

  const openEditCard = (c) => {
    setEditingCardId(c?.id ?? null);
    setCardForm({
      card_no: String(c?.card_no || ""),
      expire_month: String(c?.expire_month ?? ""),
      expire_year: String(c?.expire_year ?? ""),
      name_on_card: String(c?.name_on_card || ""),
    });
    setCardFormOpen(true);
  };

  const submitCard = async () => {
    const payload = {
      card_no: String(cardForm.card_no || "").trim(),
      expire_month: Number(cardForm.expire_month),
      expire_year: Number(cardForm.expire_year),
      name_on_card: String(cardForm.name_on_card || "").trim(),
    };

    const ok =
      /^\d{13,19}$/.test(payload.card_no) &&
      payload.expire_month >= 1 &&
      payload.expire_month <= 12 &&
      payload.expire_year >= 2020 &&
      payload.name_on_card;

    if (!ok) {
      showCenterNotice({ type: "error", title: "Card", subtitle: "Kart bilgilerini kontrol edin.", duration: 2600 });
      return;
    }

    try {
      const res = editingCardId
        ? await client.put("/user/card", { id: String(editingCardId), ...payload })
        : await client.post("/user/card", payload);

      const list = normalizeList(res.data, "cards");
      const next = list.length ? list : await client.get("/user/card").then((r) => normalizeList(r.data, "cards"));

      setCards(next);
      dispatch(setCreditCards(next));

      if (!selectedCardId && next?.[0]?.id != null) setSelectedCardId(String(next[0].id));

      setCardFormOpen(false);
      resetCardForm();
      showCenterNotice({ type: "success", title: "Card", subtitle: "Kaydedildi.", duration: 2200 });
    } catch {
      showCenterNotice({ type: "error", title: "Card", subtitle: "Kaydedilemedi.", duration: 2600 });
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await client.delete(`/user/card/${cardId}`);
      const next = cards.filter((x) => String(x?.id) !== String(cardId));
      setCards(next);
      dispatch(setCreditCards(next));

      if (String(selectedCardId) === String(cardId)) setSelectedCardId(next?.[0]?.id != null ? String(next[0].id) : "");

      showCenterNotice({ type: "success", title: "Card", subtitle: "Silindi.", duration: 2200 });
    } catch {
      showCenterNotice({ type: "error", title: "Card", subtitle: "Silinemedi.", duration: 2600 });
    }
  };

  const placeOrder = async () => {
    if (!selectedCard) {
      showCenterNotice({ type: "error", title: "Order", subtitle: "Kart seçin.", duration: 2600 });
      return;
    }
    if (!shipAddressId) {
      showCenterNotice({ type: "error", title: "Order", subtitle: "Adres seçin.", duration: 2600 });
      return;
    }
    if (!/^\d{3,4}$/.test(String(ccv || "").trim())) {
      showCenterNotice({ type: "error", title: "Order", subtitle: "CCV geçersiz.", duration: 2600 });
      return;
    }

    const productsPayload = selectedItems
      .map((row) => {
        const pid = pickId(row.product);
        if (pid == null) return null;
        return {
          product_id: Number(pid),
          count: Number(row.count) || 1,
          detail: pickDetail(row.product),
        };
      })
      .filter(Boolean);

    if (!productsPayload.length) {
      showCenterNotice({ type: "error", title: "Order", subtitle: "Seçili ürün bulunamadı.", duration: 2600 });
      return;
    }

    const payload = {
      address_id: Number(shipAddressId),
      order_date: new Date().toISOString(),
      card_no: String(selectedCard.card_no || ""),
      card_name: String(selectedCard.name_on_card || ""),
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(String(ccv).trim()),
      price: Number(pricing.total.toFixed(2)),
      products: productsPayload,
    };

    setPlacing(true);
    try {
      const res = await client.post("/order", payload);
      dispatch(clearCart());

      setStep(1);
      setCcv("");
      setSelectedCardId("");
      setShipAddressId("");
      setBillAddressId("");
      setSameAsShipping(true);

      const orderId =
        res?.data?.id ??
        res?.data?.order_id ??
        res?.data?.orderId ??
        res?.data?.data?.id ??
        res?.data?.data?.order_id ??
        null;

      showCenterNotice({ type: "success", title: "Tebrikler", subtitle: "Siparişiniz oluşturuldu.", duration: 2400 });

      navigate("/order-success", {
        replace: true,
        state: { orderId, total: pricing.total },
      });
    } catch {
      showCenterNotice({ type: "error", title: "Order", subtitle: "Sipariş oluşturulamadı.", duration: 2800 });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <Container className="py-10">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#252B42]">Create Order</div>
          <div className="text-sm font-bold text-[#737373]">
            Step {step} / 2
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {step === 1 ? (
              <div className="rounded border border-[#E6E6E6] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-[#252B42]">Step 1: Address</div>
                  <button
                    type="button"
                    onClick={openAddAddress}
                    className="inline-flex h-9 items-center justify-center rounded border border-[#23A6F0] bg-white px-4 text-sm font-bold text-[#23A6F0]"
                  >
                    Add Address
                  </button>
                </div>

                {addrLoading ? (
                  <div className="mt-6 text-sm font-bold text-[#737373]">Loading...</div>
                ) : (
                  <>
                    {addresses.length === 0 ? (
                      <div className="mt-6 text-sm font-bold text-[#737373]">Kayıtlı adres bulunamadı.</div>
                    ) : (
                      <div className="mt-6 space-y-4">
                        <div className="text-sm font-bold text-[#252B42]">Shipping Address</div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {addresses.map((a) => {
                            const id = String(a?.id ?? "");
                            const active = String(shipAddressId) === id;
                            return (
                              <button
                                key={`ship-${id}`}
                                type="button"
                                onClick={() => setShipAddressId(id)}
                                className={[
                                  "rounded border p-4 text-left",
                                  active ? "border-[#23A6F0]" : "border-[#E6E6E6]",
                                ].join(" ")}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="text-sm font-bold text-[#252B42]">{a?.title || "Address"}</div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">
                                      {a?.name} {a?.surname} · {a?.phone}
                                    </div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">
                                      {a?.city} / {a?.district}
                                    </div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">{a?.neighborhood}</div>
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openEditAddress(a);
                                      }}
                                      className="text-xs font-bold text-[#23A6F0]"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteAddress(id);
                                      }}
                                      className="text-xs font-bold text-[#23A6F0]"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={sameAsShipping}
                            onChange={(e) => setSameAsShipping(e.target.checked)}
                            className="h-4 w-4 accent-[#23A6F0]"
                          />
                          <div className="text-sm font-bold text-[#737373]">Receipt address same as shipping</div>
                        </div>

                        {!sameAsShipping ? (
                          <>
                            <div className="mt-4 text-sm font-bold text-[#252B42]">Receipt Address</div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {addresses.map((a) => {
                                const id = String(a?.id ?? "");
                                const active = String(billAddressId) === id;
                                return (
                                  <button
                                    key={`bill-${id}`}
                                    type="button"
                                    onClick={() => setBillAddressId(id)}
                                    className={[
                                      "rounded border p-4 text-left",
                                      active ? "border-[#23A6F0]" : "border-[#E6E6E6]",
                                    ].join(" ")}
                                  >
                                    <div className="text-sm font-bold text-[#252B42]">{a?.title || "Address"}</div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">
                                      {a?.name} {a?.surname} · {a?.phone}
                                    </div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">
                                      {a?.city} / {a?.district}
                                    </div>
                                    <div className="mt-1 text-xs font-bold text-[#737373]">{a?.neighborhood}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : null}
                      </div>
                    )}

                    {addressFormOpen ? (
                      <div className="mt-6 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                        <div className="text-sm font-bold text-[#252B42]">
                          {editingAddressId ? "Update Address" : "Add Address"}
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <input
                            value={addressForm.title}
                            onChange={(e) => setAddressForm((p) => ({ ...p, title: e.target.value }))}
                            placeholder="Address Title"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm((p) => ({ ...p, phone: e.target.value }))}
                            placeholder="Phone"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.name}
                            onChange={(e) => setAddressForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="Name"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.surname}
                            onChange={(e) => setAddressForm((p) => ({ ...p, surname: e.target.value }))}
                            placeholder="Surname"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.city}
                            onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))}
                            placeholder="City (İl)"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.district}
                            onChange={(e) => setAddressForm((p) => ({ ...p, district: e.target.value }))}
                            placeholder="District (İlçe)"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={addressForm.neighborhood}
                            onChange={(e) => setAddressForm((p) => ({ ...p, neighborhood: e.target.value }))}
                            placeholder="Neighborhood (Mahalle) / Details"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD] sm:col-span-2"
                          />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={submitAddress}
                            className="inline-flex h-10 items-center justify-center rounded bg-[#23A6F0] px-5 text-sm font-bold text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAddressFormOpen(false);
                              resetAddressForm();
                            }}
                            className="inline-flex h-10 items-center justify-center rounded border border-[#23A6F0] bg-white px-5 text-sm font-bold text-[#23A6F0]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="inline-flex h-11 items-center justify-center rounded border border-[#23A6F0] bg-white px-6 text-sm font-bold text-[#23A6F0]"
                      >
                        Back to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!canGoStep2}
                        className="inline-flex h-11 items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-bold text-white disabled:opacity-50"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded border border-[#E6E6E6] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-[#252B42]">Step 2: Payment</div>
                  <button
                    type="button"
                    onClick={openAddCard}
                    className="inline-flex h-9 items-center justify-center rounded border border-[#23A6F0] bg-white px-4 text-sm font-bold text-[#23A6F0]"
                  >
                    Add New Card
                  </button>
                </div>

                {cardLoading ? (
                  <div className="mt-6 text-sm font-bold text-[#737373]">Loading...</div>
                ) : (
                  <>
                    {cards.length === 0 ? (
                      <div className="mt-6 text-sm font-bold text-[#737373]">Kayıtlı kart bulunamadı.</div>
                    ) : (
                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {cards.map((c) => {
                          const id = String(c?.id ?? "");
                          const active = String(selectedCardId) === id;
                          const masked = String(c?.card_no || "").replace(/\d(?=\d{4})/g, "*");
                          return (
                            <button
                              key={`card-${id}`}
                              type="button"
                              onClick={() => setSelectedCardId(id)}
                              className={[
                                "rounded border p-4 text-left",
                                active ? "border-[#23A6F0]" : "border-[#E6E6E6]",
                              ].join(" ")}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-bold text-[#252B42]">{c?.name_on_card || "Card"}</div>
                                  <div className="mt-1 text-xs font-bold text-[#737373]">{masked}</div>
                                  <div className="mt-1 text-xs font-bold text-[#737373]">
                                    {String(c?.expire_month).padStart(2, "0")}/{c?.expire_year}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditCard(c);
                                    }}
                                    className="text-xs font-bold text-[#23A6F0]"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCard(id);
                                    }}
                                    className="text-xs font-bold text-[#23A6F0]"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {cardFormOpen ? (
                      <div className="mt-6 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                        <div className="text-sm font-bold text-[#252B42]">
                          {editingCardId ? "Update Card" : "Add Card"}
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <input
                            value={cardForm.name_on_card}
                            onChange={(e) => setCardForm((p) => ({ ...p, name_on_card: e.target.value }))}
                            placeholder="Name on Card"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={cardForm.card_no}
                            onChange={(e) => setCardForm((p) => ({ ...p, card_no: e.target.value }))}
                            placeholder="Card No"
                            inputMode="numeric"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={cardForm.expire_month}
                            onChange={(e) => setCardForm((p) => ({ ...p, expire_month: e.target.value }))}
                            placeholder="Expire Month"
                            inputMode="numeric"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                          <input
                            value={cardForm.expire_year}
                            onChange={(e) => setCardForm((p) => ({ ...p, expire_year: e.target.value }))}
                            placeholder="Expire Year"
                            inputMode="numeric"
                            className="h-10 rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                          />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={submitCard}
                            className="inline-flex h-10 items-center justify-center rounded bg-[#23A6F0] px-5 text-sm font-bold text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCardFormOpen(false);
                              resetCardForm();
                            }}
                            className="inline-flex h-10 items-center justify-center rounded border border-[#23A6F0] bg-white px-5 text-sm font-bold text-[#23A6F0]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6">
                      <div className="text-sm font-bold text-[#252B42]">CCV</div>
                      <input
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value)}
                        placeholder="123"
                        inputMode="numeric"
                        className="mt-2 h-10 w-full max-w-xs rounded border border-[#E6E6E6] px-3 text-sm font-bold text-[#252B42] placeholder:text-[#BDBDBD]"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex h-11 items-center justify-center rounded border border-[#23A6F0] bg-white px-6 text-sm font-bold text-[#23A6F0]"
                      >
                        Back to Address
                      </button>

                      <button
                        type="button"
                        onClick={placeOrder}
                        disabled={!canPlaceOrder}
                        className="inline-flex h-11 items-center justify-center rounded bg-[#23A6F0] px-6 text-sm font-bold text-white disabled:opacity-50"
                      >
                        Complete Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded border border-[#E6E6E6] bg-white p-5">
              <div className="text-base font-bold text-[#252B42]">Order Summary</div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-bold text-[#737373]">Products Total</div>
                  <div className="font-bold text-[#252B42]">{fmt(pricing.subtotal)}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="font-bold text-[#737373]">Shipping</div>
                  <div className="font-bold text-[#252B42]">{fmt(pricing.shipping)}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="font-bold text-[#737373]">Discount</div>
                  <div className="font-bold text-[#252B42]">{fmt(pricing.discount)}</div>
                </div>

                <div className="h-px w-full bg-[#E6E6E6]" />

                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-[#252B42]">Grand Total</div>
                  <div className="text-xl font-bold text-[#252B42]">{fmt(pricing.total)}</div>
                </div>
              </div>

              <div className="mt-5 rounded border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                <div className="text-sm font-bold text-[#252B42]">Selected Items</div>
                <div className="mt-3 space-y-2">
                  {selectedItems.map((row) => {
                    const p = row.product;
                    const id = pickId(p);
                    const name = String(p?.name || p?.title || "Product");
                    const count = Number(row.count) || 1;
                    const line = pickPriceNumber(p) * count;
                    return (
                      <div key={String(id)} className="flex items-center justify-between text-xs font-bold">
                        <div className="line-clamp-1 text-[#737373]">
                          {name} x{count}
                        </div>
                        <div className="text-[#252B42]">{fmt(line)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {placing ? (
                <div className="mt-4 text-sm font-bold text-[#737373]">Processing...</div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

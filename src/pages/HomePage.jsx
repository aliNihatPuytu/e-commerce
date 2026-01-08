import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productsActions";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

export default function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col px-4 py-6 gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Home</h1>
        <p className="text-sm opacity-70">
          (T02’de Figma’daki Homepage birebir yapılacak.)
        </p>
      </div>

      {loading ? (
        <div className="text-sm">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {items.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

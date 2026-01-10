import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="px-4 py-6 flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Product Detail</h1>
      <p className="text-sm opacity-70">Product id: {id}</p>
    </div>
  );
}

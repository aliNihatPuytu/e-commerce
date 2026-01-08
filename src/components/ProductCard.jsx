import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col border rounded-lg overflow-hidden w-full sm:w-[240px]"
    >
      <div className="w-full aspect-[4/3] bg-gray-100 flex">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col p-3 gap-2">
        <div className="text-sm font-medium line-clamp-2">{product.title}</div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">${product.price}</span>
          <span className="text-xs opacity-70">{product.category}</span>
        </div>
      </div>
    </Link>
  );
}

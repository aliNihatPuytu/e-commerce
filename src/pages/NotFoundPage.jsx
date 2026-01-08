import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="px-4 py-10 flex flex-col items-start gap-3">
      <h1 className="text-lg font-semibold">404</h1>
      <Link to="/" className="text-sm underline">
        Go Home
      </Link>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Login</h1>
      <Link to="/register" className="text-sm underline">
        Register
      </Link>
    </div>
  );
}

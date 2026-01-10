import React from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Register</h1>
      <Link to="/login" className="text-sm underline">
        Login
      </Link>
    </div>
  );
}

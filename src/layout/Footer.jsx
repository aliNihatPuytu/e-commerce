import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t px-4 py-6 text-xs opacity-80">
      © {new Date().getFullYear()} e-commerce
    </footer>
  );
}

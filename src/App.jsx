import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <PageContent />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

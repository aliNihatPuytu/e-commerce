import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function PageContent() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white">
      <Header />
      <section className="w-full flex-1 bg-white">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CenterNoticeHost from "../components/CenterNoticeHost";

export default function PageContent() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CenterNoticeHost />
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

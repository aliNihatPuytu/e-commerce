import { Route, Routes } from "react-router-dom";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white text-[#252B42]">
      <Routes>
        <Route element={<PageContent />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

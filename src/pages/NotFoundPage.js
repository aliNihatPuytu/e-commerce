import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-262.5 px-4 py-16 flex flex-col gap-3">
        <div className="text-3xl font-bold text-[#252B42]">404</div>
        <div className="text-sm text-[#737373]">Page not found.</div>
        <Link to="/" className="w-fit bg-[#23A6F0] text-white px-6 py-3 font-semibold">
          Go Home
        </Link>
      </div>
    </div>
  );
}

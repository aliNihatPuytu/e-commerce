import { Link } from "react-router-dom";

export default function PagesPage() {
  return (
    <div className="flex w-full justify-center bg-white">
      <div className="w-full max-w-[1050px] px-4 py-16">
        <div className="text-3xl font-bold text-[#252B42]">Pages</div>
        <div className="mt-2 text-sm text-[#737373]">Select a page:</div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/team"
            className="w-fit rounded-[5px] border border-[#23A6F0] px-6 py-3 text-sm font-bold tracking-[0.2px] text-[#23A6F0]"
          >
            Team Page
          </Link>
        </div>
      </div>
    </div>
  );
}

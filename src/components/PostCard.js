import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, ChevronRight, Star, Clock, BarChart2, TrendingUp } from "lucide-react";

export default function PostCard({ img }) {
  return (
    <div className="flex h-[404px] w-full overflow-hidden rounded-[5px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
      <div className="relative w-[209px] flex-shrink-0">
        <img src={img} alt="" className="h-full w-full object-cover" />

        <span className="absolute left-5 top-5 rounded bg-[#E74040] px-3 py-1 text-xs font-bold text-white">
          Sale
        </span>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <Heart className="h-4 w-4 text-[#252B42]" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <ShoppingCart className="h-4 w-4 text-[#252B42]" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <Eye className="h-4 w-4 text-[#252B42]" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 py-7">
        <div className="flex items-start justify-between">
          <div className="text-xs font-bold tracking-[0.2px] text-[#23A6F0]">
            English Department
          </div>

          <div className="inline-flex items-center gap-1 rounded-full bg-[#252B42] px-3 py-1 text-xs font-bold text-white">
            <Star className="h-4 w-4 text-[#FFCE31]" />
            4.9
          </div>
        </div>

        <div className="mt-3 text-xl font-bold tracking-[0.2px] text-[#252B42]">
          Graphic Design
        </div>

        <div className="mt-3 max-w-[260px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
          We focus on ergonomics and meeting you where you work. It&apos;s only a
          keystroke away.
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          <span className="text-[#BDBDBD]">$16.48</span>
          <span className="text-[#23856D]">$6.48</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#23A6F0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#23856D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E77C40]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#252B42]" />
        </div>

        <div className="mt-5 flex items-center gap-5 text-xs font-bold text-[#737373]">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#23A6F0]" />
            22h...
          </span>
          <span className="inline-flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-[#E77C40]" />
            64 Lessons
          </span>
          <span className="inline-flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#23856D]" />
            Progress
          </span>
        </div>

        <Link
          to="/blog"
          className="mt-auto inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[#23A6F0] px-6 text-sm font-bold tracking-[0.2px] text-[#23A6F0]"
        >
          Learn More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

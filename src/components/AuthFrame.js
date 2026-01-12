import { Link } from "react-router-dom";

export default function AuthFrame({ title, children, bottom, topRight }) {
  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <Link to="/" className="text-3xl font-bold tracking-[0.1px] text-[#252B42]">
              Bandage
            </Link>
            {topRight ? <div className="ml-auto">{topRight}</div> : null}
          </div>
        </div>

        <div className="rounded-md border border-[#E6E6E6] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-medium text-[#252B42]">{title}</h1>
          <div className="mt-5">{children}</div>
          {bottom ? <div className="mt-6">{bottom}</div> : null}
        </div>

        <div className="mt-6 text-center text-xs text-[#737373]">
          <span>© {new Date().getFullYear()} Bandage</span>
        </div>
      </div>
    </div>
  );
}

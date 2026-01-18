import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  info: Info,
};

const STRIPE = {
  success: "bg-[#23A6F0]",
  info: "bg-[#737373]",
};

const ICON_COLOR = {
  success: "text-[#23A6F0]",
  info: "text-[#737373]",
};

export default function CenterNoticeHost() {
  const [notice, setNotice] = useState(null);
  const [open, setOpen] = useState(false);
  const timers = useRef({ close: null, clear: null });

  useEffect(() => {
    const onShow = (e) => {
      const d = e?.detail || {};
      const next = {
        title: String(d.title || ""),
        subtitle: String(d.subtitle || ""),
        type: d.type || "info",
        duration: Number(d.duration) || 2200,
      };

      if (timers.current.close) clearTimeout(timers.current.close);
      if (timers.current.clear) clearTimeout(timers.current.clear);

      setNotice(next);
      requestAnimationFrame(() => setOpen(true));

      timers.current.close = setTimeout(() => setOpen(false), next.duration);
      timers.current.clear = setTimeout(() => setNotice(null), next.duration + 220);
    };

    window.addEventListener("center-notice", onShow);
    return () => {
      window.removeEventListener("center-notice", onShow);
      if (timers.current.close) clearTimeout(timers.current.close);
      if (timers.current.clear) clearTimeout(timers.current.clear);
    };
  }, []);

  if (!notice) return null;

  const Icon = ICONS[notice.type] || ICONS.info;
  const stripe = STRIPE[notice.type] || STRIPE.info;
  const iconColor = ICON_COLOR[notice.type] || ICON_COLOR.info;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center px-4",
        "transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="absolute inset-0 bg-black/25" onClick={() => setOpen(false)} />

      <div
        className={[
          "relative w-full max-w-md",
          "transition-all duration-200 ease-out",
          open ? "translate-y-0 scale-100" : "-translate-y-2 scale-[0.99]",
        ].join(" ")}
      >
        <div className="overflow-hidden rounded-md border border-[#E6E6E6] bg-white shadow-lg">
          <div className="relative">
            <div className={["absolute left-0 top-0 h-full w-1.5", stripe].join(" ")} />

            <div className="flex items-start gap-3 p-4 pl-5">
              <div className={["mt-0.5", iconColor].join(" ")}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-bold leading-5 text-[#252B42]">{notice.title}</div>

                {notice.subtitle ? (
                  <div className="mt-1 text-[13px] leading-5 text-[#737373]">{notice.subtitle}</div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#737373] hover:bg-[#F6F6F6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

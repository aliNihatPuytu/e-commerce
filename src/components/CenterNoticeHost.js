import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Info, X, ArrowRight } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  info: Info,
};

function pickType(t) {
  return t === "success" || t === "info" ? t : "info";
}

export default function CenterNoticeHost() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [open, setOpen] = useState(false);
  const timers = useRef({ close: null, clear: null });

  useEffect(() => {
    const onShow = (e) => {
      const d = e?.detail || {};
      const next = {
        title: String(d.title || ""),
        subtitle: String(d.subtitle || ""),
        type: pickType(d.type),
        duration: Number(d.duration) || 2400,
        actionLabel: String(d.actionLabel || ""),
        actionHref: String(d.actionHref || ""),
      };

      if (timers.current.close) clearTimeout(timers.current.close);
      if (timers.current.clear) clearTimeout(timers.current.clear);

      setNotice(next);
      requestAnimationFrame(() => setOpen(true));

      timers.current.close = setTimeout(() => setOpen(false), next.duration);
      timers.current.clear = setTimeout(() => setNotice(null), next.duration + 260);
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

  const onPrimary = () => {
    setOpen(false);
    if (notice.actionHref) navigate(notice.actionHref);
  };

  const buttonLabel = notice.actionLabel || "Continue";

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center px-4",
        "transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        className={[
          "absolute inset-0 bg-black/50",
          "backdrop-blur-[2px]",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      <div
        className={[
          "relative w-full max-w-[560px]",
          "transition-all duration-300 ease-out",
          open ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.96]",
        ].join(" ")}
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#252B42] shadow-2xl">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/70 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-10">
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-gradient-to-br from-[#23A6F0] to-[#B728FF] p-4">
                <Icon className="h-7 w-7 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[32px] font-bold leading-[38px] text-white">{notice.title}</div>
                <div className="mt-4 h-1 w-16 rounded-full bg-[#E74040]" />

                {notice.subtitle ? (
                  <div className="mt-5 text-[15px] leading-6 text-white/80">
                    {notice.subtitle}
                  </div>
                ) : null}

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={onPrimary}
                    className={[
                      "inline-flex items-center gap-2 rounded-full",
                      "border border-[#23A6F0] px-6 py-3",
                      "text-sm font-bold text-[#23A6F0]",
                      "hover:bg-[#23A6F0]/10",
                    ].join(" ")}
                  >
                    {buttonLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-[#23A6F0] via-[#B728FF] to-[#23A6F0]" />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUser, getBypass, isAuthed } from "../auth/auth";

function showCenterNotice(detail) {
  window.dispatchEvent(new CustomEvent("center-notice", { detail }));
}

export default function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed()) navigate("/login", { replace: true });
  }, [navigate]);

  const email = useMemo(() => {
    const u = getUser();
    if (u?.email) return u.email;
    const b = getBypass();
    return b?.email || "";
  }, []);

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-[1050px]">
        <div className="rounded-md border border-[#E6E6E6] bg-white p-6">
          <div className="text-2xl font-bold text-[#252B42]">My Account</div>
          {email && <div className="mt-2 text-sm font-semibold text-[#737373]">{email}</div>}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex h-11 items-center justify-center rounded border border-[#E6E6E6] px-4 text-sm font-bold text-[#252B42]"
            >
              Go Home
            </button>

            <button
              type="button"
              onClick={() => {
                clearAuth();
                showCenterNotice({ type: "info", title: "Signed out", subtitle: "", duration: 2200 });
                navigate("/", { replace: true });
              }}
              className="inline-flex h-11 items-center justify-center rounded border border-[#23A6F0] px-4 text-sm font-bold text-[#23A6F0]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

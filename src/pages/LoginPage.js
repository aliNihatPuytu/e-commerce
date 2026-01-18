import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/api";
import { setAuth, setBypass } from "../auth/auth";
import { showCenterNotice } from "../utils/centerNotice";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNotActivated(res) {
  const msg = String(res?.message || "").toLowerCase();
  return res?.status === 401 && msg.includes("not activated");
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setServerMsg("");

    const eTrim = email.trim();
    if (!emailRe.test(eTrim)) {
      setServerMsg("Invalid email");
      return;
    }
    if (!password) {
      setServerMsg("Password is required");
      return;
    }

    setLoading(true);
    const res = await loginUser({ email: eTrim, password });
    setLoading(false);

    if (res.ok) {
      setAuth(res.data);

      showCenterNotice({
        type: "success",
        title: "Signed in",
        subtitle: "",
        duration: 2600,
        actionLabel: "Go to your account",
        actionHref: "/profile",
      });

      navigate("/profile", { replace: true });
      return;
    }

    if (isNotActivated(res)) {
      setBypass(eTrim);

      showCenterNotice({
        type: "success",
        title: "Signed in",
        subtitle: "(Account not activated. Please check your email to activate.)",
        duration: 3200,
        actionLabel: "Go to your account",
        actionHref: "/profile",
      });

      toast.warning("You need to click link in email to activate your account!");
      navigate("/profile", { replace: true });
      return;
    }

    setServerMsg(res.message || "Unauthorized");
    toast.error(res.message || "Unauthorized");
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>
        </div>

        <div className="w-full rounded-md border border-[#E6E6E6] bg-white p-6">
          <h1 className="text-[28px] font-semibold leading-8 text-[#252B42]">Sign in</h1>
          <div className="mt-1 text-sm font-medium text-[#737373]">Welcome back</div>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Email</label>
              <input
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Password</label>
              <input
                type="password"
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center rounded bg-[#23A6F0] text-sm font-bold text-white disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            {serverMsg && <div className="text-xs font-medium text-red-600">{serverMsg}</div>}
          </form>
        </div>

        <div className="mt-4 w-full rounded-md border border-[#E6E6E6] bg-white p-4 text-sm text-[#252B42]">
          New to Bandage?{" "}
          <Link to="/signup" className="font-semibold text-[#23A6F0]">
            Create your account
          </Link>
        </div>
      </div>
    </div>
  );
}

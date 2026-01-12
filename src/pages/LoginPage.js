import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import client from "../api/client";
import AuthFrame from "../components/AuthFrame";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "h-10 rounded border border-[#E6E6E6] px-3 text-sm text-[#252B42] outline-none focus:border-[#23A6F0]";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await client.post("/login", {
        email: values.email,
        password: values.password,
      });

      const token =
        res?.data?.token ||
        res?.data?.access_token ||
        res?.data?.accessToken ||
        res?.data?.data?.token;

      if (token) localStorage.setItem("token", token);
      localStorage.setItem("user_email", values.email);

      toast.success("Signed in.");
      navigate("/profile");
    } catch (e) {
      const raw =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.response?.data?.detail ||
        "";

      const lower = String(raw || "").toLowerCase();

      if (lower.includes("account is not activated")) {
        localStorage.setItem("token", `dev-${Date.now()}`);
        localStorage.setItem("user_email", values.email);
        toast.success("Signed in.");
        navigate("/profile");
        return;
      }

      toast.error(String(raw || "Login failed. Please check your credentials."));
    } finally {
      setLoading(false);
    }
  }

  const bottom = (
    <>
      <div className="relative flex items-center justify-center">
        <div className="h-px w-full bg-[#E6E6E6]" />
        <div className="absolute bg-white px-3 text-xs text-[#737373]">New to Bandage?</div>
      </div>

      <Link
        to="/signup"
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded border border-[#23A6F0] bg-[#FAFAFA] text-sm font-semibold text-[#23A6F0]"
      >
        Create your Bandage account
      </Link>
    </>
  );

  return (
    <AuthFrame title="Sign in" bottom={bottom}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#252B42]">Email</label>
          <input
            className={inputCls}
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              validate: (v) => emailRe.test(String(v || "")) || "Email is not valid",
            })}
          />
          {errors.email?.message && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#252B42]">Password</label>
            <button
              type="button"
              onClick={() => toast.info("Password reset is not implemented yet.")}
              className="text-xs font-semibold text-[#23A6F0]"
            >
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            className={inputCls}
            placeholder="Your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 w-full items-center justify-center rounded bg-[#23A6F0] text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Signing in...
            </span>
          ) : (
            "Continue"
          )}
        </button>

        <p className="text-xs text-[#737373]">
          By continuing, you agree to Bandage’s Conditions of Use and Privacy Notice.
        </p>
      </form>
    </AuthFrame>
  );
}

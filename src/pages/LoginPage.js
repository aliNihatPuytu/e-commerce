import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showCenterNotice } from "../utils/centerNotice";
import { loginThunk } from "../store/actions/authThunks";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    const email = String(values.email || "").trim();
    const password = String(values.password || "");
    const rememberMe = Boolean(values.rememberMe);

    const result = await dispatch(loginThunk({ email, password, rememberMe }));

    if (result?.ok) {
      showCenterNotice({ type: "success", title: "Signed in", subtitle: "", duration: 2200 });
      navigate(from, { replace: true });
      return;
    }

    if (result?.notActivated) {
      showCenterNotice({
        type: "info",
        title: "Account not activated",
        subtitle: "(Please check your email to activate.)",
        duration: 2600,
      });
      toast.warning(result.message || "Account not activated");
      return;
    }

    toast.error(result?.message || "Unauthorized");
    setError("password", { type: "server", message: result?.message || "Unauthorized" });
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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Email</label>
              <input
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: emailRe, message: "Invalid email" },
                })}
              />
              {errors.email?.message ? <div className="text-xs font-medium text-red-600">{errors.email.message}</div> : null}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Password</label>
              <input
                type="password"
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password?.message ? (
                <div className="text-xs font-medium text-red-600">{errors.password.message}</div>
              ) : null}
            </div>

            <label className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#737373]">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#23A6F0]"
                {...register("rememberMe")}
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded bg-[#23A6F0] text-sm font-bold text-white disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
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

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchRoles, signupUser } from "../api/api";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const trPhoneOk = (v) => {
  const s = String(v || "").replace(/[^\d+]/g, "");
  const n = s.startsWith("+") ? s.slice(1) : s;
  const x = n.startsWith("90") ? n.slice(2) : n.startsWith("0") ? n.slice(1) : n;
  return /^5\d{9}$/.test(x);
};

const taxOk = (v) => /^T\d{4}V\d{6}$/.test(String(v || "").trim().toUpperCase());
const ibanOk = (v) => /^TR\d{24}$/.test(String(v || "").replace(/\s/g, "").toUpperCase());

function normalizeRoles(data) {
  const list = Array.isArray(data) ? data : Array.isArray(data?.roles) ? data.roles : [];
  return list
    .map((r) => ({
      id: r?.id ?? r?.role_id ?? r?._id,
      name: r?.name ?? r?.title ?? r?.role ?? "",
      code: r?.code ?? r?.key ?? "",
    }))
    .filter((r) => r.id != null && String(r.name || r.code || "").length);
}

function isCustomerRole(r) {
  const x = `${r?.name} ${r?.code}`.toLowerCase();
  return x.includes("customer");
}

function isStoreRole(r) {
  const x = `${r?.name} ${r?.code}`.toLowerCase();
  return x.includes("store");
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role_id: "",
      store_name: "",
      store_phone: "",
      store_tax_no: "",
      store_bank_account: "",
    },
  });

  useEffect(() => {
    let alive = true;

    (async () => {
      setRolesLoading(true);
      const res = await fetchRoles();
      if (!alive) return;

      if (!res.ok) {
        setRoles([]);
        setRolesLoading(false);
        toast.error(res.message || "Roles could not be loaded");
        return;
      }

      const normalized = normalizeRoles(res.data);
      setRoles(normalized);
      setRolesLoading(false);

      const defaultRole = normalized.find(isCustomerRole) || normalized[0];
      if (defaultRole?.id != null) setValue("role_id", String(defaultRole.id));
    })();

    return () => {
      alive = false;
    };
  }, [setValue]);

  const roleId = watch("role_id");
  const password = watch("password");

  const selectedRole = useMemo(() => roles.find((r) => String(r.id) === String(roleId)), [roles, roleId]);
  const storeSelected = useMemo(() => isStoreRole(selectedRole), [selectedRole]);

  const onSubmit = async (values) => {
    if (submitting) return;
    if (!roleId) {
      toast.error("Role is required");
      return;
    }

    setSubmitting(true);

    const base = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      role_id: Number(roleId),
    };

    const payload = storeSelected
      ? {
          ...base,
          store: {
            name: values.store_name.trim(),
            phone: String(values.store_phone || "").trim(),
            tax_no: String(values.store_tax_no || "").trim().toUpperCase(),
            bank_account: String(values.store_bank_account || "").replace(/\s/g, "").toUpperCase(),
          },
        }
      : base;

    const res = await signupUser(payload);
    setSubmitting(false);

    if (!res.ok) {
      toast.error(res.message || "Signup failed");
      return;
    }

    toast.warning("You need to click link in email to activate your account!");
    navigate(-1);
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold tracking-[0.1px] text-[#252B42]">Bandage</div>
        </div>

        <div className="w-full rounded-md border border-[#E6E6E6] bg-white p-6">
          <h1 className="text-[28px] font-semibold leading-8 text-[#252B42]">Create account</h1>
          <div className="mt-1 text-sm font-medium text-[#737373]">Sign up to continue</div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Name</label>
              <input
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                {...register("name", { required: "Name is required", minLength: { value: 3, message: "Min 3 chars" } })}
              />
              {errors.name && <div className="text-xs font-medium text-red-600">{errors.name.message}</div>}
            </div>

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
              {errors.email && <div className="text-xs font-medium text-red-600">{errors.email.message}</div>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Password</label>
              <input
                type="password"
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                {...register("password", {
                  required: "Password is required",
                  validate: (v) => passRe.test(v) || "Min 8 + upper + lower + number + special",
                })}
              />
              {errors.password && <div className="text-xs font-medium text-red-600">{errors.password.message}</div>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Re-enter password</label>
              <input
                type="password"
                className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                {...register("passwordConfirm", {
                  required: "Confirm password is required",
                  validate: (v) => v === password || "Passwords do not match",
                })}
              />
              {errors.passwordConfirm && (
                <div className="text-xs font-medium text-red-600">{errors.passwordConfirm.message}</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#252B42]">Role</label>
              <select
                disabled={rolesLoading}
                className="h-11 rounded border border-[#E6E6E6] bg-white px-3 text-sm outline-none focus:border-[#23A6F0] disabled:opacity-60"
                {...register("role_id", { required: true })}
              >
                <option value="" disabled>
                  {rolesLoading ? "Loading..." : "Select role"}
                </option>
                {roles.map((r) => (
                  <option key={r.id} value={String(r.id)}>
                    {r.name}
                  </option>
                ))}
              </select>
              {!roleId && !rolesLoading && <div className="text-xs font-medium text-red-600">Role is required</div>}
            </div>

            {storeSelected && (
              <>
                <div className="mt-2 text-sm font-bold text-[#252B42]">Store details</div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Store Name</label>
                  <input
                    className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                    {...register("store_name", {
                      validate: (v) => (!storeSelected ? true : String(v || "").trim().length >= 3 || "Min 3 chars"),
                    })}
                  />
                  {errors.store_name && <div className="text-xs font-medium text-red-600">{errors.store_name.message}</div>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Store Phone</label>
                  <input
                    className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                    placeholder="5XXXXXXXXX"
                    {...register("store_phone", {
                      validate: (v) => (!storeSelected ? true : trPhoneOk(v) || "Invalid TR phone"),
                    })}
                  />
                  {errors.store_phone && (
                    <div className="text-xs font-medium text-red-600">{errors.store_phone.message}</div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Store Tax ID</label>
                  <input
                    className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                    placeholder="T1234V123456"
                    {...register("store_tax_no", {
                      validate: (v) => (!storeSelected ? true : taxOk(v) || "Format: TXXXXVXXXXXX"),
                    })}
                  />
                  {errors.store_tax_no && (
                    <div className="text-xs font-medium text-red-600">{errors.store_tax_no.message}</div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Store Bank Account (IBAN)</label>
                  <input
                    className="h-11 rounded border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#23A6F0]"
                    placeholder="TR________________________"
                    {...register("store_bank_account", {
                      validate: (v) => (!storeSelected ? true : ibanOk(v) || "Invalid TR IBAN"),
                    })}
                  />
                  {errors.store_bank_account && (
                    <div className="text-xs font-medium text-red-600">{errors.store_bank_account.message}</div>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitting || rolesLoading || !roleId}
              className="inline-flex h-11 w-full items-center justify-center rounded bg-[#23A6F0] text-sm font-bold text-white disabled:opacity-60"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Creating...
                </span>
              ) : (
                "Create your account"
              )}
            </button>
          </form>
        </div>

        <div className="mt-4 w-full rounded-md border border-[#E6E6E6] bg-white p-4 text-sm text-[#252B42]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#23A6F0]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

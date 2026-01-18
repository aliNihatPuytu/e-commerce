import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthed } from "../auth/auth";

export default function RequireAuth() {
  const location = useLocation();
  const user = useSelector((s) => s?.client?.user || {});

  const authed = useMemo(() => {
    const email = String(user?.email || "").trim();
    return Boolean(email) || isAuthed();
  }, [user]);

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

import client from "../../api/client";
import { setRoles } from "./clientActions";

let inFlight = null;

function normalizeRolesPayload(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.roles)) return data.roles;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const existing = getState()?.client?.roles;
  if (Array.isArray(existing) && existing.length) {
    return { ok: true, data: existing, cached: true };
  }

  if (!inFlight) {
    inFlight = client
      .get("/roles")
      .then((res) => res.data)
      .finally(() => {
        inFlight = null;
      });
  }

  try {
    const data = await inFlight;
    const roles = normalizeRolesPayload(data);
    dispatch(setRoles(roles));
    return { ok: true, data: roles };
  } catch (err) {
    return {
      ok: false,
      status: err?.response?.status,
      message: err?.response?.data?.message || err?.message || "Roles fetch failed",
      raw: err?.response?.data,
    };
  }
};
